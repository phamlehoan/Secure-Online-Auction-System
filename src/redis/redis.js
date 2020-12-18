const RedisService = {};

let client = null;

RedisService.initial = (redis) => {
    client = redis;
}

/**
 * 
 * @param {String} key 
 */
RedisService.getCache = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

/**
 * 
 * @param {String} key 
 * @param {String} value 
 */
RedisService.setCache = async (key, value) => {
    return await client.set(key, value);
}

export default RedisService;
