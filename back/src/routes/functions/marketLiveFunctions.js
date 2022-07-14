const { MarketLive, Player } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")

async function getMarketLive () {

    try {

    const market = await MarketLive.findAll()

    if (market) return market
    else return "No market found"

    } catch (e) {
        throw new Error("An error has ocurred, no market found")
    }

}

async function marketOfferInsert (playerID, {
        period,
        typeProduct,
        stockProduct,
        qualityProduct,
        priceProduct
        }) 

        {
            
        try {

        const player = await Player.findOne({ where: { id: playerID } });

        if (!player) return "No player found"
        // console.log(player.dataValues.officialName)

        const marketInsert = await MarketLive.create({
            period: period,  
            officialName: player.dataValues.officialName,
            fantasyName: player.dataValues.fantasyName,
            typeProduct: typeProduct, 
            stockProduct: stockProduct,
            qualityProduct: qualityProduct,
            priceProduct: priceProduct
        })
    
        await player.addMarketLive(marketInsert);
    
        if (marketInsert) return (marketInsert)
    
        } catch (e) {
            throw new Error("An error has ocurred, cannot create a market offer")
        }
    
    
}

async function marketOfferDecrement (playerID, {
    period,
    typeProduct,
    purchase
    }) 
    {

        // console.log("soy el marketObject", marketObject)

    try {

    const marketObject = await MarketLive.findOne({ where: { playerId: playerID, period: period, typeProduct: typeProduct } }); 

    if (marketObject?.dataValues.stockProduct < purchase) return ("No stock")

            try {

                const newMarketObject = await marketObject.decrement({stockProduct: purchase})

                if (newMarketObject) return (newMarketObject)

            }   catch (e) {

                return ("No product found")
            
            }

    } catch (e) {

        console.log(e)
        throw new Error("An error has ocurred, cannot found the product")
    }

}


module.exports = { getMarketLive, marketOfferInsert, marketOfferDecrement }