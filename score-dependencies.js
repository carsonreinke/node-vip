const dependencies = require('./dependencies');

const scoreDependencies = async(path, pkgs) => {
    const scores = {};
    const depth = 2.0 ** -(path.length - 1);

    console.debug(`Scoring dependencies from ${path.join(' > ')}`);

    for(let pkg of pkgs) {
        //Check for circular dependencies
        if(path.includes(pkg)) {
            continue;
        }

        //Update score
        if(!scores[pkg]) {
            scores[pkg] = 0.0;
        }
        scores[pkg] = scores[pkg] + depth;

        //Update the path to include this package
        const newPath = path.slice();
        newPath.push(pkg);

        const dependentScores = await scoreDependencies(
            newPath,
            await dependencies(pkg)
        );

        //Merge in sub-dependencies
        for(dependentPkg in dependentScores) {
            if(!scores[dependentPkg]) {
                scores[dependentPkg] = 0.0;
            }
            scores[dependentPkg] += dependentScores[dependentPkg];
        }
    };

    return Promise.resolve(scores);
};

module.exports = scoreDependencies;