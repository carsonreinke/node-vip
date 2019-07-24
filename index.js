const fs = require('fs');
const path = require('path');
const os = require('os');
const Registry = require('package-stream');
const cacache = require('cacache/en');
const scores = require('./scores');
const jsonfile = require('jsonfile');
const ReportEntry = require('./report-entry');

const storagePath = path.join(os.tmpdir(), 'node-vip');

const processRegistry = async() => {
    return new Promise(async(resolve, reject) => {
        const registry = Registry();
        registry.on('package', async(pkg, seq) => {
            console.debug(`Loading dependencies for ${pkg.name}`);
        
            let obj = await cacache.get.info(storagePath, pkg.name);
            let data = null, metadata = {};
            if(obj) {
                data = obj.data;
                metadata = obj.metadata || {};
            }
            
            if(!metadata.scored) {
                await cacache.put(
                    storagePath, 
                    pkg.name, 
                    JSON.stringify(pkg.depNames), 
                    {metadata: {scored: true, score: 0.0, impact: 0}}
                );
                
                console.debug(`Scoring dependencies for ${pkg.name}`);
                
                await scores(pkg.name, pkg.depNames);

                //Clear local cache because of memory limits
                cacache.clearMemoized();
            }
        }).on('up-to-date', () => {
            resolve();
        });
    });
};

const processScores = async() => {
    return new Promise(async(resolve, reject) => {
        cacache.ls.stream(storagePath).on('data', (obj) => {
            
            if(obj.metadata && obj.metadata.score) {
                reportEntries.push(new ReportEntry(obj.key, obj.metadata.score, obj.metadata.impact));
            }
        }).on('end', () => {
            resolve();
        });
    });
};

const report = async() => {
    const reportEntries = [];

    return new Promise(async(resolve, reject) => {
        cacache.ls.stream(storagePath).on('data', (obj) => {
            if(obj.metadata && obj.metadata.score) {
                reportEntries.push(new ReportEntry(obj.key, obj.metadata.score, obj.metadata.impact));
            }
        }).on('end', () => {
            resolve(reportEntries.sort((a, b) => b.score - a.score));
        });
    });
};

(async() => {
    //Clear the cache
    console.debug('Clearing storage');
    await cacache.rm.all(storagePath);

    //Process the entire registry
    console.debug('Processing registry');
    await processRegistry();

    //Report on all the scores
    console.debug('Producing report');
    const scores = await report();

    //Write report to file
    const reportPath = path.join(os.tmpdir(), 'node-vip-report.json');
    console.debug(`Writing report to ${reportPath}`);
    await jsonfile.writeFile(reportPath, scores);

    console.debug('Complete');
})();