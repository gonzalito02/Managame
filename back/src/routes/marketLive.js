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

router.post("/bulk/insert",  async (req, res) => {

    try {

        var errors = []

        for (var i = 0; i < req.body.length; i++) {
            const response = await marketOfferInsert(req.body[i].id, req.body[i].insert)
            if (response === "No player found") errors.push({id: req.body[i].id, insert: req.body[i].insert})
            else (console.log(`Insert ${req.body[i].id}, ${req.body[i].insert} to market`))
        }

        if (errors.length > 0) {res.send({message: "Insert products with errors, check out the log"}); console.log(errors)}
        else (res.send({message: "Insert products to market done"}))

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


// la siguiente url simula una salida de stock del mercado:

router.put("/:id",  async (req, res) => {

    const { id } = req.params

    try {

        const marketOffer = await marketOfferDecrement(id, req.body)
        if (marketOffer === "No stock") return res.send({message: "There is no enough stock"})
        else return res.send({message: "Decrement done"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/bulk/decrement",  async (req, res) => {

    try {
        var errors = []

        for (var i = 0; i < req.body.length; i++) {
            const response = await marketOfferDecrement(req.body[i].purchase)
            if (response === "No stock") errors.push({id: req.body[i].purchase.playerId, purchase: req.body[i].purchase})
            else if (response === "No product found") errors.push({id: req.body[i].purchase.playerId, purchase: req.body[i].purchase})
            else (console.log(`Purchase ${req.body[i].purchase.playerId}, ${req.body[i].purchase} done`))
        }

        if (errors.length > 0) return (res.send({message: "Purchase with errors, check out the log"}), console.log(errors))
        else res.send({message: "Purchase done"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router