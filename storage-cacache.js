const cacache = require('cacache/en');
const config = require('./config');

module.exports = {
    init: async() => {},

    keys: () => {
        const keys = new Set();

        return new Promise((resolve, reject) => {
            try {
                cacache.ls.stream(config.storagePath).on('data', (obj) => {
                    keys.add(obj.key);
                }).once('end', async() => {
                    resolve(keys);
                });
            }
            catch(e) {
                reject(e);
            }
        });
    },

    get: async(key) => {
        let obj;

        try {
            obj = await cacache.get(config.storagePath, key);
        }
        catch(e) {
            return undefined;
        }

        return {
            key,
            data: JSON.parse(obj.data || '[]'),
            metadata: obj.metadata || {}
        }
    },

    put: (key, data, metadata) => {
        return cacache.put(
            config.storagePath, 
            key, 
            JSON.stringify(data), 
            {metadata}
        );
    },

    clear: () => {
        return cacache.rm.all(config.storagePath);
    }
};