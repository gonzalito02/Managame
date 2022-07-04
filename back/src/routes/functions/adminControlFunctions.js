const { GameControl } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// costo de produccion de los productos
// tasa minima de costo de un prestamo
// montos maximos de inversión y mínimo de producción.

async function gameControlCreate ({period, variables}) {

    try {

    const gameControl = await GameControl.create({
        period: period,
        variables: variables
    })

    if (gameControl) return gameControl

    } catch (e) {
        throw new Error("Cannot create the gameControl. Try again.")
    }

}

async function getGameControl () {

    try {

    const gameControls = await GameControl.findAll({})

    if (gameControls) return gameControls

    } catch (e) {
        throw new Error("No forms found")
    }

}

module.exports = { gameControlCreate, getGameControl }