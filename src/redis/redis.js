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

/**
 * Set single object to redis hash
 * 
 * @param {String} key 
 * @param {Object} object 
 */
RedisService.setHashCache = (key, object) => {
    return new Promise((resolve, reject) => {
        let keys = Object.keys(object);
        if (keys.length > 1) {
            return reject('Not single object');
        }
        client.hmset(key, keys[0], JSON.stringify(object[keys[0]]), (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

RedisService.delHashCache = (key, field) => {
    return new Promise((resolve, reject) => {
        client.hdel(key, field, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
}

RedisService.getActiveUsers = () => {
    return new Promise((resolve, reject) => {
        client.hgetall('users', (err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res);
          })
    })
}

export default RedisService;
