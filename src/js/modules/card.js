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