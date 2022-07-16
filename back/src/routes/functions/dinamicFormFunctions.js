const { DinamicForm, Player } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

async function getDinamicForms () {

    try {

        const dinForms = await DinamicForm.findAll()
        
        console.log(dinForms)

        if (dinForms[0].dataValues.playerId > 0) return dinForms
        
        else return "No dinamic forms found"

    } catch (e) {
        throw new Error("No dinamic forms found")
    }

}

async function getDinamicFormId (id) {

    try {

        const dinamicForm = await DinamicForm.findAll({
            where: {playerId: id}
        })

        if (dinamicForm[0].dataValues.playerId > 0) return dinamicForm
        
        else return "No dinamic form found"

    } catch (e) {
        throw new Error(`No dinamic forms found, playerID: ${id}`)
    }

}

async function dinamicFormCreate (playerID,
    {
        period, 
        type,
        amount, 
        rate
    }
    ) {

    if (!period || !type || !amount || !rate) return "missing data"

    console.log(period, type, amount, rate)

    try {

    const player = await Player.findOne({ where: { id: playerID } });

    const newDinamicForm = await DinamicForm.create({
        period: period,  
        type: type,
        amount: amount, 
        rate: rate
    })

    console.log(newDinamicForm)

        await player.addDinamicForm(newDinamicForm);

        if (newDinamicForm) return (newDinamicForm)

    } catch (e) {
        throw new Error("Cannot create the dinamic form")
    }

}

module.exports = { getDinamicForms, dinamicFormCreate, getDinamicFormId }