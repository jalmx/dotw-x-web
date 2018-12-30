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