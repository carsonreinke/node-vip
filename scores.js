const cacache = require('cacache/en');
const scoreDependencies = require('./score-dependencies');
const config = require('./config');

const scores = async(pkg, dependencies) => {
    const scorePkgs = await scoreDependencies([pkg], dependencies);
    let obj;

    for(let scorePkg in scorePkgs) {
        obj = await cacache.get(config.storagePath, scorePkg);
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
            config.storagePath, 
            scorePkg, 
            obj.data, 
            {metadata: obj.metadata}
        );
    }

    return scorePkgs;
};

module.exports = scores;