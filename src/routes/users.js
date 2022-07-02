// con las siguientes líneas de codigo inicilizamos el archivo para colocar las rutas de forma que luego
// puedan ser llamadas como modulo.

const express = require("express")
const router = express.Router()

// aca se construyen las rutas sobre router:

router.get("/", (req, res) => {
    res.send("en este momento estamos en users")
})

module.exports = router