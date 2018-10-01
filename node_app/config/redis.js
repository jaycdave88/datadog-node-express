const redis_host = process.env.REDIS_HOST || 'demo-redis';
const redis_port = process.env.REDIS_PORT || '6379';

module.exports = {

    // Redis session settings
    session: {
        host: redis_host,
        port: parseInt(redis_port),
        ttl: 86400 // 1 day
    },
    secret: "tell-no-one-and-you-may-live1",
    secure_cookie: false,
};
