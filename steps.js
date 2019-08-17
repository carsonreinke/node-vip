const fs = require('fs');
const path = require('path');
//const Registry = require('package-stream');
const storage = require('./storage');
const scores = require('./scores');
const jsonfile = require('jsonfile');
const ReportEntry = require('./report-entry');
const config = require('./config');
const ChangesStream = require('changes-stream');
const Package = require('nice-package');
const got = require('got');
const ProgressBar = require('progress');

const clear = async() => {
    await storage.init();
    await storage.clear();
};

const loadRegistry = async() => {
    await storage.init();

    return new Promise((resolve, reject) => {
        //Copied from `package-stream` for better controls, basically so it can be stopped
        let finalUpdate;
        let changes = new ChangesStream({db: config.database, include_docs: true})

        let cancelled = false;
        const request = got(config.database, {json: true});
        request.then(response => {
            finalUpdate = response.body.update_seq
            const bar = new ProgressBar('[:bar] (:etas) :current/:total -> :package', {total: response.body.doc_count, width: 20});

            changes.on('data', async(change) => {
                var pkg = new Package(change.doc);
                if(!pkg.valid) {
                    bar.tick();
                    return;
                }

                //console.debug(`Loaded dependencies for ${pkg.name}`);
                const dependencies = config.allDependencies ? pkg.allDepNames : pkg.depNames;

                //Only store if we have a name
                if(pkg.name) {
                    await storage.put(pkg.name, dependencies, {score: 0.0, impact: 0});
                }

                bar.tick({'package': pkg.name});

                //Check we have not cancelled, if so, cancel
                if(!cancelled && change.seq >= finalUpdate) {
                    //request.cancel();
                    changes.destroy();
                    cancelled = true;

                    console.log('\n');
                }
            });
            changes.on('end', resolve);
        });
    });
};

const processScores = async() => {
    await storage.init();

    const pkgs = await storage.keys();
    const bar = new ProgressBar('[:bar] (:etas) :current/:total -> :package', {total: pkgs.size, width: 20});

    for(let pkg of pkgs) {
        bar.tick({'package': pkg});

        pkgs.delete(pkg);

        const obj = await storage.get(pkg);
        await scores(obj.key, obj.data);
    }

    console.log('\n');
};

const buildReport = async() => {
    await storage.init();

    const pkgs = await storage.keys();
    const bar = new ProgressBar('[:bar] (:etas) :current/:total -> :package', {total: pkgs.size, width: 20});
    const entries = [];
    const report = {
        entries,
        total: {score: 0.0, impact: 0},
        others: {score: 0.0, impact: 0}
    };

    for(let pkg of pkgs) {
        bar.tick({'package': pkg});

        pkgs.delete(pkg);

        const obj = await storage.get(pkg);
        if(obj.metadata && obj.metadata.score && obj.metadata.score > 0.0) {
            entries.push(
                new ReportEntry(
                    pkg, 
                    obj.metadata.score, 
                    obj.metadata.impact
                )
            );
        }
    }
    console.log('\n');

    //Sort by score
    entries.sort((a, b) => b.score - a.score)

    //Calculate some totals
    report.total = entries.reduce((accumulator, currentValue) => {
        accumulator.score += currentValue.score;
        accumulator.impact += currentValue.impact;
        return accumulator;
    }, report.total);
    report.others = entries.reduceRight((accumulator, currentValue, index) => {
        if(index >= config.reportSize) {
            accumulator.score += currentValue.score;
            accumulator.impact += currentValue.impact;
        }
        return accumulator;
    }, report.others);

    //Reduce report size
    report.entries = entries.slice(0, config.reportSize);

    return report;
};

const writeReport = async(report) => {
    await jsonfile.writeFile(config.reportPath, report);
};

module.exports = {
    clear,
    loadRegistry,
    processScores,
    buildReport,
    writeReport
};