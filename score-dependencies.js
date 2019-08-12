const dependencies = require('./dependencies');

const naughtyPackages = [
    'lower-case-nodered',
    'readtest',
    'statusnode',
    'playnode',
    'languenode',
    'menunode',
    'callnode',
    'skillstatenode',
    'callodig',
    'allnodes',
    'requestnodelecomte',
    'writenodelecomte',
    'routingnodelecomte',
    'drivenode',
    'endnode',
    'executenode',
    'messagenodelecomte',
    'questionmessage',
    'nodemessagelecomte',
    'languenodedeux',
    'questionlecomte',
    'requestusser',
    'questionfirstinfo',
    'questiongetsetting',
    'readtesta',
    'responselecomte',
    'domeconect',
    'smsodigo',
    'emailodigo',
    'receiveodigomessage',
    'carousselodigo',
    'youtubeodigo',
    'checkboxodigo',
    'placemarkerodigo',
    'positionodigo',
    'positionnameodigo',
    'adressodigo',
    'nearodigo',
    'node-odigo-first',
    'node-red-contrib-odigo'
];

const scoreDependencies = async(path, pkgs) => {
    const scores = {};
    const depth = 2.0 ** -(path.length - 1);

    //console.debug(`Scoring dependencies from ${path.join(' > ')}`);

    for(let pkg of pkgs) {
        //Missing package name
        if(!pkg) {
            continue;
        }

        //Check for circular dependencies
        if(path.includes(pkg)) {
            continue;
        }

        //Ignore some special packages used for dependency testing
        if(naughtyPackages.includes(pkg) || pkg.match(/^strongcanary/) || pkg.match(/^npm-cycle/) || pkg.match(/^npm-circdep-test/)) {
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