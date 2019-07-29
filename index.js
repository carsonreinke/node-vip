const program = require('commander');
const config = require('./config');
const steps = require('./steps');

//Parse arguments out and update configuration
program
    .option('-s, --storage-path [value]', 'Path to store data')
    .option('-r, --report-path [value]', 'Path to store report')
    .parse(process.argv);
if(program.storagePath) {
    config.storagePath = program.storagePath;
}
if(program.reportPath) {
    config.reportPath = program.reportPath;
}

(async() => {
    //Clear the cache
    console.debug('Clearing storage');
    await steps.clear();

    //Process the entire registry
    console.debug('Processing registry');
    await steps.loadRegistry();

    //Process the scores from the registry
    console.debug('Processing scores');
    await steps.processScores();

    //Report on all the scores
    console.debug('Producing report');
    const scores = await steps.buildReport();

    //Write report to file
    console.debug(`Writing report to ${config.reportPath}`);
    await steps.writeReport(scores);

    console.debug('Complete');
})();