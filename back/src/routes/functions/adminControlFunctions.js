const { GameControl, ActionData } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// costo de produccion de los productos
// tasa minima de costo de un prestamo
// montos maximos de inversión y mínimo de producción.

async function gameControlCreate (variables) {

    try {

    const gameControl = await GameControl.create({
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

async function updateGameControl ({variables}) {

    try {

        const gameControl = await GameControl.update(
        {
            variables: variables,
        }
        );
        
        return gameControl
    } catch (e) {
        throw new Error("No gameControl found")
    }

}

async function validateActionForms ({playerId, period}) {
    try {

        const validate = await ActionData.update(
            {
                validateByAdmin: true
            },
            {
                where: {
                    playerId: playerId,
                    period: period
                }
            }
            );
        
        return validate

    } catch (e) {
        throw new Error("Cannot validate the indicated form")
    }
}


module.exports = { gameControlCreate, getGameControl, updateGameControl, validateActionForms }