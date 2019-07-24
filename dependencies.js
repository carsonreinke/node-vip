const path = require('path');
const os = require('os');
const cacache = require('cacache/en');
const got = require('got');
const Package = require('nice-package');

const cachePath = path.join(os.tmpdir(), 'node-vip');

const dependencies = async(name) => {
    let data = null, metadata = {};
    //TODO 2 queries
    let obj = await cacache.get.info(cachePath, name);
    if(obj) {
        obj = await cacache.get(cachePath, name);
        data = obj.data;
        metadata = obj.metadata;
    }
    if(data) {
        return Promise.resolve(JSON.parse(data));
    }
    else {
        let dependencies = [];

        const doc = await got(`https://replicate.npmjs.com/${encodeURIComponent(name)}`, {json: true}).catch(err => {
            //Missing, just ignore
            return Promise.resolve({});
        });
        const pkg = new Package(doc.body);
        if(pkg.valid) {
            dependencies = pkg.depNames; //pkg.allDepNames;
        }

        await cacache.put(
            cachePath, 
            name, 
            JSON.stringify(dependencies),
            {metadata: {scored: true, score: 0.0, impact: 0}}
        );
        return Promise.resolve(dependencies);
    }
};

module.exports = dependencies;