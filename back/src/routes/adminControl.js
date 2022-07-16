const express = require("express")
const validationAdmin = require("../controllers/validationAdmin.js")
const { gameControlCreate, getGameControl, updateGameControl, validateActionForms, deleteForm, getAdminForms } = require("./functions/adminControlFunctions.js")
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

router.put("/", async (req, res) => {
    
    if ( !req.body ) res.send({error:true, message: "missing data"})

    try {

        const gameControl = await updateGameControl(req.body)
        if (gameControl) return res.send({message: "gameControl update"})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})


//la siguiente accion valida un formulario
//  |
//  |
//  V

router.put("/form", async (req, res) => {

    
    let { period, playerId, type } = req.body
    if ( !period || !playerId || !type) res.send({error:true, message: "missing data"})

    try {

        const validate = await validateActionForms(req.body)
        if (validate) return res.send({message: "form validated succesfully"})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }
})

//la siguiente accion elimina un formulario
//  |
//  |
//  V

router.delete("/", async (req, res) => {

    let { period, playerId } = req.body

    if ( !period || !playerId ) res.send({error:true, message: "missing data"}) 

    try {

        const form = await deleteForm(req.body)
        if (form) return res.send({message: `form destroyed`})
        else res.status(400).send({message: `cannot destroy`})

    } catch (e) {

        res.status(400).send(e.message)
    
    }

})

router.get("/getFormsValidate",  async (req, res) => {

    try {

        const forms = await getAdminForms(req.body)
        if (forms) return res.send({message: "pendding forms obtained", response: forms})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router