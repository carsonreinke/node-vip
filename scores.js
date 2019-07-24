const path = require('path');
const os = require('os');
const cacache = require('cacache/en');
const scoreDependencies = require('./score-dependencies');

const storagePath = path.join(os.tmpdir(), 'node-vip');

const scores = async(pkg, dependencies) => {
    const scorePkgs = await scoreDependencies([pkg], dependencies);
        
    for(let scorePkg in scorePkgs) {
        //TODO 2 queries
        let obj = await cacache.get.info(storagePath, scorePkg);
        if(obj) {
            obj = await cacache.get(storagePath, scorePkg);
            if(!obj.metadata) {
                obj.metadata = {};
            }
            if(!obj.metadata.score) {
                obj.metadata.score = 0.0;
            }
            if(!obj.metadata.impact) {
                obj.metadata.impact = 0;
            }
            
            obj.metadata.score += scorePkgs[scorePkg];
            obj.metadata.impact++;

            await cacache.put(
                storagePath, 
                scorePkg, 
                obj.data, 
                {metadata: obj.metadata}
            );
        }
        else {
            throw new Error(`Package is missing in storage ${scorePkg}`)
        }
    }

    return scorePkgs;
};

module.exports = scores;