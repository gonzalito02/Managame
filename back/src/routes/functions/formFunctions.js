const { Player } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")
const { ActionData } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

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

async function getForm (id) {

    try {

    const form = await ActionData.findAll({
        where: {playerId: id}
    })

    if (form[0].dataValues.id > 0) return form
    else return "No forms found"

    } catch (e) {
        throw new Error(`No forms found, playerID: ${id}`)
    }

}

async function deleteForm (id) {

    try {

    const form = await ActionData.destroy({
        where: {id: id}
    })

    if (form) return {response: "form destroyed", deletedData: form}

    } catch (e) {
        throw new Error("No form found to delete")
    }

}

module.exports = { formCreate, getForms, getForm, deleteForm }