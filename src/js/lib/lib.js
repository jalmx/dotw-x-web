function mean(data=[]){
    let suma = data.reduce((a,b)=>{
        a+b
    });

    return suma / data.length;
}

function desviationMean(data = []){

}
module.exports = {
    mean,
    desviationMean
}