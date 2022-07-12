const express = require("express")
const { gameControlCreate, getGameControl, updateGameControl, validateActionForms } = require("./functions/adminControlFunctions.js")
const router = express.Router()


router.get("/",  async (req, res) => {

    try {

        const gameControl = await getGameControl()
        if (gameControl) return res.send({message: "gameControls getted", response: gameControl})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.post("/",  async (req, res) => {

    let { variables } = req.body
    if ( !variables ) res.send({error:true, message: "missing data"})

    try {

        const gameControl = await gameControlCreate(req.body)
        if (gameControl) return res.send({message: "gameControl created"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/",  async (req, res) => {

    let { variables } = req.body
    if ( !variables ) res.send({error:true, message: "missing data"})

    try {

        const gameControl = await updateGameControl(req.body)
        if (gameControl) return res.send({message: "gameControl update"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.put("/form",  async (req, res) => {

    console.log("aca")
    let { period, id } = req.body
    if ( !period || !id ) res.send({error:true, message: "missing data"})

    try {

        const validate = await validateActionForms(req.body)
        if (validate) return res.send({message: "form validated succesfully"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router