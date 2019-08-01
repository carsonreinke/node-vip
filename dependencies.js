const storage = require('./storage');
const got = require('got');
const Package = require('nice-package');
const config = require('./config');

const dependencies = async(name) => {
    let deps = [];

    const obj = await storage.get(name);
    if(obj) {
        return obj.data;
    }

    //Load the dependencies directly
    const doc = await got(`${config.database}/${encodeURIComponent(name)}`, {json: true}).catch(err => {
        //Missing, just ignore
        return {};
    });
    const pkg = new Package(doc.body);
    if(pkg.valid) {
        deps = config.allDependencies ? pkg.allDepNames : pkg.depNames;
    }

    //Store the depedencies
    await storage.put(name, deps, {score: 0.0, impact: 0});

    return deps;
};

module.exports = dependencies;