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

async function updateResultsData (playerID, {
    period,
    totalSales,
    finantialInvestmentResults,
    loanInterest,
    extraResults
    }) 
    {

    try {

        const resultsData = await MarketLive.findOne({ where: { playerId: playerID, period: period }}); 
            
        const updatedResults = await resultsData.increment({
            totalSales: totalSales || 0,
            finantialInvestmentResults: finantialInvestmentResults || 0,
            loanInterest: loanInterest || 0,
            extraResults: extraResults || 0

        })

        if (updatedResults) return (updatedResults)
            
    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot update the resultsData")
    }

}

module.exports = { resultsDataCreate, getResultsData, getResultsDataById, updateResultsData }