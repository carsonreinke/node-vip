const storage = require('./storage');
const scoreDependencies = require('./score-dependencies');
const config = require('./config');

const scores = async(pkg, dependencies) => {
    const scorePkgs = await scoreDependencies([pkg], dependencies);
    let obj;

    for(let scorePkg in scorePkgs) {
        obj = await storage.get(scorePkg);
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

        await storage.put(scorePkg, obj.data, obj.metadata);
    }

    return scorePkgs;
};

module.exports = scores;