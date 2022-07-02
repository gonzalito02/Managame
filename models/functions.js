// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

function addProduct (algo) {
    console.log("esto es un algo: ", algo)
}

module.exports = {addProduct}
