import {GoogleCharts} from 'google-charts';
const report = require('../report.json');

GoogleCharts.load(() => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'Package');
    data.addColumn('number', 'Score');
    report.entries.forEach(entry => {
        data.addRow([entry.name, entry.score);
    });
    data.addRow(['Others', report.others.score]);

    const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data);
});