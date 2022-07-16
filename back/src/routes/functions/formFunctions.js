const { Player } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")
const { ActionData, DinamicForm } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

async function formCreate (playerID,
    {
        period, 
        priceA, 
        qualityA,
        quantityA,
        priceB, 
        qualityB,
        quantityB,
        priceC, 
        qualityC,
        quantityC,
        qualityInvestment,
        finantialFixedInvestment,
        finantialFixedRentability
    }
    ) {

    try {

    const player = await Player.findOne({ where: { id: playerID } });

    console.log("aca estoy")

    const newForm = await ActionData.create({
        period: period,  
        priceA: priceA, 
        qualityA: qualityA,
        quantityA: quantityA,
        priceB: priceB, 
        qualityB: qualityB,
        quantityB: quantityB,
        priceC: priceC, 
        qualityC: qualityC,
        quantityC: quantityC,
        qualityInvestment: qualityInvestment,
        finantialFixedInvestment: finantialFixedInvestment,
        finantialFixedRentability: finantialFixedRentability
    })

    await player.addActionData(newForm);

    if (newForm) return (newForm)

    } catch (e) {
        throw new Error("Cannot create the form")
    }

}

async function getForms () {

    try {

    const forms = await ActionData.findAll()

    if (forms[0].dataValues.id > 0) return forms
    else return "No forms found"

    } catch (e) {
        throw new Error("No forms found")
    }

}

async function getPenddingForms () {

    try {

    const forms = await ActionData.findAll({
        where:{
            validateByAdmin: false
        }
    })

    if (forms[0].dataValues.id > 0) return forms
    else return "No forms found"

    } catch (e) {
        throw new Error("No pedding for validate forms found")
    }

}

async function getForm(id) {

    try {

        const forms = await ActionData.findAll({ where: {playerId: id}})
        const dinamicforms = await DinamicForm.findAll({ where: {playerId: id}})
        
        if (forms || dinamicforms) return forms.concat(dinamicforms)
        else return "No forms found"

    } catch (e) {
        throw new Error(`No forms found, playerID: ${id}`)
    }

}

module.exports = { formCreate, getForms, getForm, getPenddingForms }