const { ActionData } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

async function formCreate (playerID,
    {
        period, 
        initialCapital, 
        priceA, 
        quanlityA,
        quantityA,
        priceB, 
        quanlityB,
        quantityB,
        priceC, 
        quanlityC,
        quantityC,
        qualityInvestment,
        finantialInvestment,
        loanInvestment
    }
    ) {

    try {

    const newForm = await ActionData.create({
        playerID: playerID, 
        period: period,  
        initialCapital: initialCapital, 
        priceA: priceA, 
        quanlityA: quanlityA,
        quantityA: quantityA,
        priceB: priceB, 
        quanlityB: quanlityB,
        quantityB: quantityB,
        priceC: priceC, 
        quanlityC: quanlityC,
        quantityC: quantityC,
        qualityInvestment: qualityInvestment,
        finantialInvestment: finantialInvestment,
        loanInvestment: loanInvestment
    })

    if (newForm) return newForm

    } catch (e) {
        throw new Error("Cannot create the form")
    }

}

async function getForms () {

    try {

    const forms = await ActionData.findAll({})

    if (forms[0].dataValues.id > 0) return forms
    else return "No forms found"

    } catch (e) {
        throw new Error("No forms found")
    }

}

async function getForm (id) {

    try {

    const form = await ActionData.findAll({
        where: {playerID: id}
    })

    if (form[0].dataValues.id > 0) return form
    else return "No forms found"

    } catch (e) {
        throw new Error("No forms found")
    }

}

async function deleteForm (id) {

    try {

    const form = await ActionData.destroy({
        where: {id: id}
    })

    if (form) return {response: "form destroyed", deletedData: form}

    } catch (e) {
        throw new Error("No form found")
    }

}

module.exports = { formCreate, getForms, getForm, deleteForm }