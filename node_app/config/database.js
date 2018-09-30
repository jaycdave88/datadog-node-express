const mongo_host = process.env.MONGO_HOST || 'demo-mongo';
const mongo_port = process.env.MONGO_PORT || '27017';

module.exports = {


    
    // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    mongo_host: mongo_host,
    mongo_port: mongo_port,
    mongo_db: 'Users',
    mongo_set_connected: function(connected){
        mongo_connected = connected;
    },
    mongo_is_connected: function(){
        return mongo_connected;
    },
     //Please replace your host file Here : 127.1.1.0 , Express is Collection Name (Database Name)
};
