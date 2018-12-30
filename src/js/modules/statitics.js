const mean = (data) => {
    return (data.reduce((prev, value) => prev + value) / data.length).toFixed(2);
}

const meanDeviation = (data) => {
    const v = variance(data)
    return (Math.sqrt(v).toFixed(2));
}

const median = (data) => {
    data = data.sort();
    let value = "";
    const half = data.length / 2;

    if (data.length % 2 === 0) {
        value = (data[half - 1] + data[half]) / 2;
    } else {
        value = data[Math.floor(half)]
    }
    return value;
}

const distributionMean = (data) => {
    const m = mean(data);
    const mD = meanDeviation(data)
    return {
        min: (m - mD).toFixed(2),
        max: (parseFloat(m) + parseFloat(mD)).toFixed(2)
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
    const m = mean(data);

    const add = data
        .map((value) => Math.pow(value - m, 2))
        .reduce((prev, value) => prev + value)

    return (add / data.length).toFixed(2);
}

const cVariation = (data) => (meanDeviation(data) / mean(data)).toFixed(2);


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
    cVariation,
    range,
    mode,
    mean,
    meanDeviation,
    median,
    nData
}