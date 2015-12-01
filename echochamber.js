
var resultsDiv;
var datasetList;

window.onload = function () {
    resultsDiv  = document.getElementById('stats');
    datasetList = document.getElementById('dataset');
    datasetNList = document.getElementById('datasetN');

    random();
    //datasetList.value = [2, 3, 4, 6, 2, 5, 7, 2, 4, 5, 99];
    //
    //recalculate();
};

outputResult = function (stats) {
    var str =
    "size      = " + stats.size                 + "<br />" +
    "mean      = " + stats.mean     .toFixed(2) + "<br />" +
    "variance  = " + stats.variance .toFixed(2) + "<br />" +
    "deviation = " + stats.deviation.toFixed(2) + "<br />" +
    "echo      = " + stats.echo     .toFixed(2) + "<br />";

    resultsDiv.innerHTML = str;
};

getStats = function (dataset) {
    var stats = {
        size      : 0,
        mean      : 0,
        variance  : 0,
        deviation : 0,
        echoScore : 0,
    };

    stats.size = dataset.length;

    var sum = 0;
    dataset.forEach(function (value) {
        sum += value;
    });

    var datasetN = [];
    dataset.forEach(function (value) {
        datasetN.push(value / sum);
    });

    var datasetNText = [];
    datasetN.forEach(function (value) {
        datasetNText.push(value.toFixed(2));
    });

    datasetNList.value = datasetNText.join('\n');

    var sum = 0;
    datasetN.forEach(function (value) {
        sum += value;
    });

    stats.mean = sum / dataset.length;

    sum = 0;
    datasetN.forEach(function (value) {
        sum += Math.pow(value - stats.mean, 2);
    });

    stats.variance = sum / dataset.length;
    stats.deviation = Math.sqrt(stats.variance);
    stats.echo = (1 - stats.deviation) * dataset.length;

    return stats;
};

recalculate = function() {
    var dataText = datasetList.value;
    var dataTextArray = dataText.split(',');
    var data = [];

    dataTextArray.forEach(function(value) {
       data.push(parseFloat(value));
    });

    var stats = getStats(data);
    outputResult(stats);
};

random = function() {
    var datasetSize = randomIntFromInterval(1,10);
    var dataset = [];

    for (var i = 0; i < datasetSize; i++) {
        dataset.push(randomIntFromInterval(1,100));
    }

    datasetList.value = dataset.join(',');

    recalculate();
};

randomIntFromInterval = function(min,max) {
    return Math.floor((max - min + 1) * Math.random() + min);
};
