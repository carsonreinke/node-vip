import {GoogleCharts} from 'google-charts';
const report = require('../report.json');

const drawChart = () => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'Package');
    data.addColumn('number', 'Score');
    report.entries.slice(0, 9).forEach(entry => {
        data.addRow([entry.name, entry.score]);
    });
    //data.addRow(['Others', report.others.score]);

    const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data);
};

const drawTable = () => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'Package');
    data.addColumn('number', 'Score');
    data.addColumn('number', 'Impact');
    report.entries.forEach(entry => {
        data.addRow([entry.name, entry.score, entry.impact]);
    });

    const chart = new GoogleCharts.api.visualization.Table(document.getElementById('table'));
    chart.draw(data);
};

GoogleCharts.load(() => {
    drawChart();
    drawTable();
}, {packages: ['table']});