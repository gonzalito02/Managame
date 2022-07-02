// otro ejemplo para modularizar.

const express = require("express")
const router = express.Router()

const { addProduct } = require("../models/functions.js")

// aca iria la ruta correspondiente, y se puede utilizar la funcion addProduct.:

router.get("/", (req, res) => {
    //algo
})

// si se arma una funcion, lo ideal es utilizar un throw new Error: de esta forma se puede aplicar un manejo de errores con try catch


module.exports = router