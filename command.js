const program = require('commander');
const config = require('./config');
const steps = require('./steps');

//Parse arguments out and update configuration
program
    .option('-s, --storage-path [value]', 'Path to store data')
    .option('-r, --report-path [value]', 'Path to store report')
    .option('-rs --report-size [value]', 'Size of the report')
    .parse(process.argv);
if(program.storagePath) {
    config.storagePath = program.storagePath;
}
if(program.reportPath) {
    config.reportPath = program.reportPath;
}
if(program.reportSize) {
    config.reportSize = program.reportSize;
}