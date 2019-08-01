const persist = require('node-persist');
const config = require('./config');

module.exports = {
    init: async() => {
        await persist.init({
            dir: config.storagePath,
            expiredInterval: null
        });
    },

    keys: async() => {
        return new Set(await persist.keys());
    },

    get: async(key) => {
        const obj = await persist.getItem(key);

        if(!obj) {
            return undefined;
        }

        return {
            key,
            data: obj.data,
            metadata: obj.metadata
        };
    },

    put: async(key, data, metadata) => {
        await persist.setItem(key, {
            data,
            metadata
        });
    },

    clear: async() => {
        await persist.clear();
    }
};