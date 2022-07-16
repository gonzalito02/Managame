const express = require("express")
const validateJwt = require("../controllers/validationJWT.js")
const validationPlayer = require("../controllers/validationPlayer.js")
const { getDinamicForms, dinamicFormCreate, getDinamicFormId } = require("./functions/dinamicFormFunctions.js")
const router = express.Router()

// aca se construyen las rutas sobre router:

router.get("/", async (req, res) => {

    try {

        const dinamicForm = await getDinamicForms()
        if (dinamicForm) return res.send({message: "dinamic forms obtained", response: dinamicForm})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params

    try {

        const dinamicForm = await getDinamicFormId(id)
        if (dinamicForm) return res.send({message: "dinamic forms obtained", response: dinamicForm})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

// validateJwt, validationPlayer
router.post("/:id", async (req, res) => {
    
    const { id } = req.params

    try {

        const newDinamicForm = await dinamicFormCreate(id, req.body)
        if (newDinamicForm === "missing data") return res.send({message: "missing data"}) 
        else return res.send({message: `form created for playerID ${id}`, response: newDinamicForm})
        
    
    } catch (e) {

        res.status(400).send(e.message)
    
    }

    // }
})

module.exports = router