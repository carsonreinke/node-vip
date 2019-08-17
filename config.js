const path = require('path');
const os = require('os');

const defaultConfig = {
    allDependencies: false,
    storagePath: path.join(os.tmpdir(), 'node-vip'),
    reportPath: path.join(os.tmpdir(), 'node-vip-report.json'),
    database: 'https://replicate.npmjs.com',
    reportSize: 100
};

if(!global.config) {
    global.config = Object.assign({}, defaultConfig);
}
module.exports = global.config;