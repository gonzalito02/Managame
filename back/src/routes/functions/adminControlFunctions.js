const { GameControl, ActionData, DinamicForm } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

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

async function updateGameControl (variables) {

    try {

        console.log("estoy aca en variables", variables)

        await GameControl.destroy({where: {}})

        const gameControl = await GameControl.create(
        {
            variables: variables,
        }
        );
        
        return gameControl
    } catch (e) {
        throw new Error("No gameControl found")
    }

}

async function validateActionForms ({playerId, period, type}) {
    try {

        const validate = await ActionData.update(
            {
                validateByAdmin: type
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

async function deleteForm ({playerId, period}) {

    try {

    const form = await ActionData.destroy({
        where: {
            playerId: playerId,
            period: period
        }
    })

    console.log("soy el delete", form)

    return form

    } catch (e) {
        throw new Error("No form found to delete")
    }

}

// incluye formularios 
async function getAdminForms ({type, period}) {

    try {

    if (!type && !period) {

        const forms = await ActionData.findAll({})
        const dinamicforms = await DinamicForm.findAll({})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    } 
    
    if (type && !period) {

        const forms = await ActionData.findAll({ where: {validateByAdmin: type}})
        const dinamicforms = await DinamicForm.findAll({ where: {validateByAdmin: type}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    if (!type && period) {

        const forms = await ActionData.findAll({ where: {period: period}})
        const dinamicforms = await DinamicForm.findAll({ where: {period: period}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    if (type && period) {

        const forms = await ActionData.findAll({ where: {period: period, validateByAdmin: type}})
        const dinamicforms = await DinamicForm.findAll({ where: {period: period, validateByAdmin: type}})
        if (forms || dinamicforms) return forms.concat(dinamicforms)

    }

    else {
        return "nothing found"
    }

    } catch (e) {
        throw new Error("An error has ocurred, no forms found")
    }

}


module.exports = { gameControlCreate, getGameControl, updateGameControl, validateActionForms, deleteForm, getAdminForms }