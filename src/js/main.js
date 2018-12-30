const statitic = require('./modules/statitics');
const cardContainer = document.getElementById('container-cards');
const input = document.getElementById('input-data');
const btn = document.getElementById('btn-calculate');
const btnErase = document.getElementById('btn-erase');

input.addEventListener('keyup', e => {
    evaluate(input.value);
});

btn.addEventListener('click', e => {
    e.preventDefault();
    evaluate(input.value);
})

btnErase.addEventListener('click', e => {
    e.preventDefault();
    input.value = '';
    cardContainer.innerHTML = '';
})

addEventListener('click', e => {

    const menu = document.getElementById('menu-option');

    if (e.target.classList.value.includes('menu-option')) {
        if (e.target.dispatchEvent.toString() === 'menu-option') {
            e.preventDefault();
        }
        menu.classList.toggle('menu-hidden');
    } else {
        menu.classList.add('menu-hidden');
    }

})
const evaluate = data => {
    const regexAll = /[^0-9.^0-9\,]|[^\w.\d$\,]/;
    const regexDot = /\.{2,}/;

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
        const clean = require('./modules/clean');
        buildSection(clean(data))
    }
}

const buildSection = data => {
    const cardBuilder = require('./modules/card');

    const noData = cardBuilder({
        title: 'Cantidad de datos',
        value: [
            {
                title: 'No datos',
                value: statitic.nData(data)
            }
        ]
    });
    const tendecyCentral = cardBuilder({
        title: 'Tendencia central',
        value: [
            {
                title: 'Media',
                value: statitic.mean(data)
            },
            {
                title: 'Mediana',
                value: statitic.median(data)
            },
            {
                title: 'Moda',
                value: statitic.mode(data)
            }
        ]
    });

    const dispersion = cardBuilder({
        title: 'Medidas de dispersión',
        value: [
            {
                title: 'Desviación media',
                value: statitic.meanDeviation(data)
            },
            {
                title: 'Varianza',
                value: statitic.variance(data)
            },
            {
                title: 'Coeficiente de Variación (CV)',
                value: statitic.cVariation(data)
            },
            {
                title: 'Rango',
                value: statitic.range(data)
            }
        ]
    });
    const otros = cardBuilder({
        title: 'Otros',
        value: [
            {
                title: 'M±DM',
                value: statitic.distributionMean(data)
            }
        ]
    });

    cardContainer.innerHTML = noData + tendecyCentral + dispersion + otros;
}