import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleCharts} from 'google-charts';
const report = require('../report.json');

const drawChart = () => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'Package');
    data.addColumn('number', 'Score');
    report.entries.slice(0, 99).forEach(entry => {
        data.addRow([entry.name, entry.score]);
    });
    const notOthersScore = report.entries.slice(100).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.score;
    }, 0.0);
    data.addRow(['Others', report.others.score + notOthersScore]);

    const chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data);
};

const drawScatter = () => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('number', 'Impact');
    data.addColumn('number', 'Score');
    data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
    report.entries.forEach(entry => {
        data.addRow([entry.impact, entry.score, `<b>${entry.name}</b> with score of ${Math.round(entry.score)} and impact ${entry.impact}`]);
    });
    const options = {
        hAxis: {title: 'Impact'},
        vAxis: {title: 'Score'},
        legend: 'none',
        tooltip: {isHtml: true}
    };

    const chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById('chart'));
    chart.draw(data, options);
};

const drawTable = () => {
    const data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('string', 'Package');
    data.addColumn('number', 'Score');
    data.addColumn('number', 'Impact');
    report.entries.forEach(entry => {
        data.addRow([entry.name, Math.round(entry.score), entry.impact]);
    });

    const chart = new GoogleCharts.api.visualization.Table(document.getElementById('table'));
    chart.draw(data);
};

GoogleCharts.load(() => {
    drawScatter();
    drawTable();
}, {packages: ['scatter', 'table']});