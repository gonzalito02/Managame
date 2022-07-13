const express = require("express")
const router = express.Router()
const { MarketLive } = require('../db.js')
const { getMarketLive, marketOfferInsert, marketOfferDecrement } = require("./functions/marketLiveFunctions.js")

router.get("/",  async (req, res) => {

    try {

        const market = await getMarketLive()
        if (market) return res.send({message: "market obtained", response: market})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/:id",  async (req, res) => {

    // let {} = req.body
    // if (!playerId || !officialName || !group || !members || !password) res.send({error:true, message: "missing data"})
    const { id } = req.params

    try {

        const marketOffer = await marketOfferInsert(id, req.body)
        if (marketOffer) return res.send({message: "Market offer inserted"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/:id",  async (req, res) => {

    // let {} = req.body
    // if (!playerId || !officialName || !group || !members || !password) res.send({error:true, message: "missing data"})
    const { id } = req.params

    try {

        const marketOffer = await marketOfferDecrement(id, req.body)
        if (marketOffer === "No stock") return res.send({message: "There is no enough stock"})
        else return res.send({message: "Decrement done"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router