import redisAdapter from "socket.io-redis";

/**
 * Redis socketIo configurations
 * 
 * @param {Socket} io 
 * @param {String} host 
 * @param {Number} port 
 * @param {Number} tls 
 */
let redis = (io, host, port, tls) => {
    return io.adapter(redisAdapter({
         host, 
         port
    }));
}

export default redis;
