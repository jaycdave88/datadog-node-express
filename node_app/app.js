// Dependancies
const express = require('express');
// create express app
const app = express();
const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        plugins: true,
                                        sampleRate: 1});
                                        // debug: true}) // useful for seeing request/response and any logs
const bodyParser = require('body-parser');


const session = require('express-session');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');


//mongoose = restful.mongoose;

const port = process.env.PORT || 3000;

const mongo_host = process.env.MONGO_HOST || 'demo-mongo';
const mongo_port = process.env.MONGO_PORT || '27017';

const redis_host = process.env.REDIS_HOST || 'demo-redis';
const redis_port = process.env.REDIS_PORT || '6379';

// Mongodb

// Connection URL
const url = 'mongodb://'+mongo_host+':'+mongo_port;

// Database Name
const dbName = 'Users';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to MongoDB");
  const db = client.db(dbName);
  client.close();
});


//mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://demo-mongo:27017/Users', { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// create and connect redis client to local instance.
const client = redis.createClient('redis://'+redis_host+':'+redis_port);

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// simple route
app.get('/', (req, res) => {
    const span = tracer.startSpan('web.request')
    res.json({"message": "Welcome to Datadog Note Taking API."});
    span.setTag('http.url', '/')
    span.finish()
});

require('./routes/routes')(app);


// Start Server
app.listen(port);
console.log('API is running on port localhost:3000');
