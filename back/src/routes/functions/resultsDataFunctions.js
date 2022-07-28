const { Player } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")
const { ResultsData } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

async function resultsDataCreate (playerID,
    {
        period, 
        qualityInvestment,
        finantialFixedInvestment
    }
    ) 
    
    {
        console.log(playerID, period, qualityInvestment, finantialFixedInvestment)
    try {

    const player = await Player.findOne({ where: { id: playerID } });

    const resultsData = await ResultsData.create({
        period: period,  
        totalSales: 0,
        finantialInvestmentResults: finantialFixedInvestment || 0,
        qualityInvestment: qualityInvestment || 0,
        loanInterest: 0,
        extraResults: 0,
        observations: ""
    })

    await player.addResultsData(resultsData);

    console.log(resultsData)

    if (resultsData) return (resultsData)

    } catch (e) {
        throw new Error("An error has ocurred, cannot create the resultsData")
    }

}

async function getResultsData () {

    try {

    const resultsData = await ResultsData.findAll()

    if (resultsData[0].dataValues.playerId > 0) return resultsData
    else return "No resultsData found"

    } catch (e) {
        throw new Error("An error has ocurred, no resultsData found")
    }

}

async function getResultsDataById(id) {

    try {

        const resultsData = await ResultsData.findAll({ where: {playerId: id}})
        
        if (resultsData) return resultsData
        else return "No resultsData found"

    } catch (e) {
        throw new Error(`No resultsData found, playerID: ${id}`)
    }

}

async function updateResultsData (playerId, {
    period,
    totalSales,
    finantialInvestmentResults,
    loanInterest,
    extraResults,
    observations
    }) 
    {

    
    try {

        const resultsData = await ResultsData.findOne({ where: { playerId: playerId, period: period }}); 

        if (!resultsData) return "No resultsData found"
 
        if(extraResults) await resultsData.increment("extraResults", {by: extraResults})
        if(totalSales) await resultsData.increment("totalSales", {by: totalSales})
        if(finantialInvestmentResults) await resultsData.increment("finantialInvestmentResults", {by: finantialInvestmentResults})
        if(loanInterest) await resultsData.increment("loanInterest", {by: loanInterest})
        if(observations) await resultsData.update({observations: observations})

        const newResultsData = await ResultsData.findOne({ where: { playerId: playerId, period: period }}); 

        if (newResultsData) return (newResultsData)
            
    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot update the resultsData")
    }

}

async function updateBulkResultsData (data) {

    var log = []

    data.forEach(d => {
        let {period, playerId, stockProduct, priceProduct } = d.purchase
        const totalSales = stockProduct * priceProduct
        var load = updateResultsData(playerId, {period, totalSales})
        log.push(load)
    })

    return log
}

module.exports = { resultsDataCreate, getResultsData, getResultsDataById, updateResultsData, updateBulkResultsData }