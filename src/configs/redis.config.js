import redis from "redis";

/**
 * Redis socketIo configurations
 * 
 * @param {String} host 
 * @param {Number} port 
 * @param {Number} tls 
 */
let redisConfig = (host, port) => {
    return redis.createClient({
        port,
        host,
    });
}

export default redisConfig;
