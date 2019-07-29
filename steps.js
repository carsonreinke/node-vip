const fs = require('fs');
const path = require('path');
//const Registry = require('package-stream');
const cacache = require('cacache/en');
const scores = require('./scores');
const jsonfile = require('jsonfile');
const ReportEntry = require('./report-entry');
const config = require('./config');
const ChangesStream = require('changes-stream')
const Package = require('nice-package')
const got = require('got')

const clear = async() => {
    await cacache.rm.all(config.storagePath);
};

const loadRegistry = async() => {
    return new Promise((resolve, reject) => {
        //Copied from `package-stream` for better controls, basically so it can be stopped
        let finalUpdate;
        let changes = new ChangesStream({db: config.database, include_docs: true})

        let cancelled = false;
        const request = got(config.database, {json: true});
        request.then(response => {
            finalUpdate = response.body.update_seq
            changes.on('data', async(change) => {
                var pkg = new Package(change.doc);
                if(!pkg.valid) return;

                //console.debug(`Loaded dependencies for ${pkg.name}`);
                const dependencies = config.allDependencies ? pkg.allDepNames : pkg.depNames;
                await cacache.put(
                    config.storagePath, 
                    pkg.name, 
                    JSON.stringify(dependencies), 
                    {metadata: {score: 0.0, impact: 0}}
                );

                //Check we have not cancelled, if so, cancel
                if(!cancelled && change.seq >= finalUpdate) {
                    request.cancel();
                    changes.destroy();
                    cancelled = true;
                }
            });
            changes.on('end', resolve);
        });
    });
};

const processScores = async() => {
    const pkgs = new Set();

    return new Promise((resolve, reject) => {
        cacache.ls.stream(config.storagePath).on('data', (obj) => {
            pkgs.add(obj.key);
        }).once('end', async() => {
            for(let pkg of pkgs) {
                pkgs.delete(pkg);

                const obj = await cacache.get(config.storagePath, pkg);
                await scores(obj.key, JSON.parse(obj.data || '[]'));
            }

            resolve();
        });
    });
};

const buildReport = async() => {
    const pkgs = new Set();
    const reportEntries = [];

    return new Promise((resolve, reject) => {
        cacache.ls.stream(config.storagePath).on('data', (obj) => {
            pkgs.add(obj.key);
        }).on('end', async() => {
            for(let pkg of pkgs) {
                pkgs.delete(pkg);

                const obj = await cacache.get(config.storagePath, pkg);
                if(obj.metadata && obj.metadata.score && obj.metadata.score > 0.0) {
                    reportEntries.push(
                        new ReportEntry(
                            pkg, 
                            obj.metadata.score, 
                            obj.metadata.impact
                        )
                    );
                }
            }

            resolve(
                reportEntries.sort((a, b) => b.score - a.score)
            );
        });
    });
};

const writeReport = async(scores) => {
    await jsonfile.writeFile(config.reportPath, scores);
};

module.exports = {
    clear,
    loadRegistry,
    processScores,
    buildReport,
    writeReport
};