const mean = (data) => {
    return (data.reduce((prev, value) => prev + value) / data.length).toFixed(2);
}

const meanDeviation = (data) => {
    const mean = (data.reduce((prev, value) => prev + value) / data.length).toFixed(2);

    const add = data.reduce((prev, value) => Math.pow(value - mean, 2) + prev);
    return (Math.sqrt(add / data.length)).toFixed(2);
}

const median = (data) => {
    data = data.sort();
    let value = "";
    const half = data.length / 2;

    if (data.length % 2 === 0) {
        value = `${data[half - 1]}, ${data[half]} `
    } else {
        value = data[Math.floor(half)]
    }
    return value;
}

const distributionMean = (data) => {
    const mean = (data.reduce((prev, value) => prev + value) / data.length);

    const add = (data.reduce((prev, value) => Math.pow(value - mean, 2) + prev));
    const desviation = (Math.sqrt(add / data.length));
    return {
        min: (mean - desviation).toFixed(2),
        max: (mean + desviation).toFixed(2)
    }
}

const mode = (datas) => {

    let mode = 0;
    let maxTimeRepeat = 1;

    for (let data of datas) {
        let timesRepeat = 0;

        for (let dataTime of datas) {
            if (data == dataTime)
                timesRepeat++;
        }

        if (timesRepeat > maxTimeRepeat) {
            mode = data;
            maxTimeRepeat = timesRepeat;
        }
    }

    return mode;
}

const variance = (data) => {
    const mean = (Math.round(data.reduce((prev, value) => prev + value) / data.length)).toFixed(2);

    const add = (data.reduce((prev, value) => Math.pow(value - mean, 2) + prev)).toFixed(2);
    return (add / data.length).toFixed(2);
}

const covariance = (data) => {
    const mean = (data.reduce((prev, value) => prev + value) / data.length).toFixed(2);

    const add = data.reduce((prev, value) => Math.pow(value - mean, 2) + prev);
    const meanDeviation = (Math.sqrt(add / data.length)).toFixed(2);

    return (meanDeviation / mean).toFixed(2);
}

const range = (data) => {
    if (data.length === 1) {
        return data[0]
    } else {
        data = data.sort();
        return {
            range: (data[data.length - 1] - data[0]),
            min: data[0],
            max: data[data.length - 1]
        }
    }
}

nData = (data) => data.length;

module.exports = {
    distributionMean,
    variance,
    covariance,
    range,
    mode,
    mean,
    meanDeviation,
    median,
    nData
}