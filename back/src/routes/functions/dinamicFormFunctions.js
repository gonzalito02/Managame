const { resultsDataCreate } = require("./resultsDataFunctions")
const { DinamicForm, Player } = require('../../db')

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
        rate,
        description,
        clearingPeriod
    }
    ) {

    var dataControl = playerID.toString() + period.toString() + type

    if (!period || !type || !amount || !rate) return "missing data"

    if (type === "loan" && !clearingPeriod) return "missing clearing period"

    try {

    const player = await Player.findOne({ where: { id: playerID } });

    const newDinamicForm = await DinamicForm.create({
        period: period,  
        type: type,
        amount: amount, 
        rate: rate,
        description: description,
        clearingPeriod: clearingPeriod,
        idControl: dataControl
    })

    await player.addDinamicForm(newDinamicForm);

    if (newDinamicForm) return (newDinamicForm)

    } catch (e) {
        throw new Error("Cannot create the dinamic form")
    }

}

async function closeDinamicForm ({ 
    period, 
    playerId, 
    amount, 
    rate, 
    description }
) {

    try {

        const closer = await DinamicForm.update(
            {
                amount: amount,
                rate: rate,
                descriptionClose: description,
                status: true
            },
            {
                where: {
                    playerId: playerId,
                    period: period,
                    type: "investment",
                }
            }
            );

        return closer

    } catch (e) {
        throw new Error("Cannot close the indicated form")
    }

}

// async function closeValidatedLoan ({ 
//     period, 
//     playerId, 
//     loanInterest,
//     }
    
//     ) {

//     try {

//         const resultsData = resultsDataCreate(playerId, {loanInterest, period})
        
//         if (resultsData) return resultsData

//     } catch (e) {
//         throw new Error("Cannot close the loan form")
//     }

// }

module.exports = { getDinamicForms, dinamicFormCreate, getDinamicFormId, closeDinamicForm }