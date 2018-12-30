(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var statitic = require('./modules/statitics');

var cardContainer = document.getElementById('container-cards');
var input = document.getElementById('input-data');
var btn = document.getElementById('btn-calculate');
var btnErase = document.getElementById('btn-erase');
input.addEventListener('keyup', function (e) {
  evaluate(input.value);
});
btn.addEventListener('click', function (e) {
  e.preventDefault();
  evaluate(input.value);
});
btnErase.addEventListener('click', function (e) {
  e.preventDefault();
  input.value = '';
  cardContainer.innerHTML = '';
});
addEventListener('click', function (e) {
  var menu = document.getElementById('menu-option');

  if (e.target.classList.value.includes('menu-option')) {
    if (e.target.dispatchEvent.toString() === 'menu-option') {
      e.preventDefault();
    }

    menu.classList.toggle('menu-hidden');
  } else {
    menu.classList.add('menu-hidden');
  }
});

var evaluate = function evaluate(data) {
  var regexAll = /[^0-9.^0-9\,]|[^\w.\d$\,]/;
  var regexDot = /\.{2,}/;

  if (data === '') {
    input.classList.remove('error-input');
    return;
  }

  if (regexAll.exec(data) || regexDot.exec(data)) {
    input.classList.add('error-input');
    return;
  } else {
    input.classList.remove('error-input');
  }

  if (data[data.length - 1] === ',') {
    if (data[data.length - 2] === ',') {
      input.value = data.slice(0, data.length - 1);
      return;
    }
  }

  if (!input.classList.contains('error-input')) {
    var clean = require('./modules/clean');

    buildSection(clean(data));
  }
};

var buildSection = function buildSection(data) {
  var cardBuilder = require('./modules/card');

  var noData = cardBuilder({
    title: 'Cantidad de datos',
    value: [{
      title: 'No datos',
      value: statitic.nData(data)
    }]
  });
  var tendecyCentral = cardBuilder({
    title: 'Tendencia central',
    value: [{
      title: 'Media',
      value: statitic.mean(data)
    }, {
      title: 'Mediana',
      value: statitic.median(data)
    }, {
      title: 'Moda',
      value: statitic.mode(data)
    }]
  });
  var dispersion = cardBuilder({
    title: 'Medidas de dispersión',
    value: [{
      title: 'Desviación media',
      value: statitic.meanDeviation(data)
    }, {
      title: 'Varianza',
      value: statitic.variance(data)
    }, {
      title: 'Coeficiente de Variación (CV)',
      value: statitic.cVariation(data)
    }, {
      title: 'Rango',
      value: statitic.range(data)
    }]
  });
  var otros = cardBuilder({
    title: 'Otros',
    value: [{
      title: 'M±DM',
      value: statitic.distributionMean(data)
    }]
  });
  cardContainer.innerHTML = noData + tendecyCentral + dispersion + otros;
};
},{"./modules/card":2,"./modules/clean":3,"./modules/statitics":4}],2:[function(require,module,exports){
const card = data => {
    return /*html*/ `
    <div class="card">
        <h1 class="card__title">${data.title}</h1> 
          ${createValue(data.value)}
    </div>
    `
}
const buildObject = object => {
    let values = '';

    if (object['range']) {
        values += object['range'] + " "
    }
    if (object['min']) {
        values += 'min: ' + object['min'] + " "
    }
    if (object['max']) {
        values += 'max: ' + object['max'] + " "
    }
    return values;
}

const createValue = value => {
    let cardBody = '';

    value.forEach(element => {
        cardBody +=
    /*html*/ `
    <div class="card__data">
       <h3 class="card__value">${element.title}:</h3>
       <h3 class="card__value">${
            typeof element.value === 'object' ? buildObject(element.value) : element.value

            }</h3>
    </div>
       `
    });

    return cardBody;
}


module.exports = card;
},{}],3:[function(require,module,exports){
/**
 * 
 * @param {*} data limpiar los datos para ingresarlos
 */
const cleanValues = data => {
    let arr = data.split(',');
    let cleanData = [];
    arr.forEach(element => {
        if (element.trim() != '') cleanData.push(parseFloat(element))
    });
    return cleanData;
}
module.exports = cleanValues; 
},{}],4:[function(require,module,exports){
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
},{}]},{},[1])