import Redis from "redis";

/**
 * Redis configuration
 * 
 * @param {String} host 
 * @param {Number} port 
 * @param {Number} tls 
 * @returns {Redis} client
 */
let redis = (host, port, tls) => {
    return Redis.createClient({
        host,
        port,
        tls
    });
}

export default redis;
