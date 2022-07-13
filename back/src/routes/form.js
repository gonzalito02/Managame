// con las siguientes líneas de codigo inicilizamos el archivo para colocar las rutas de forma que luego
// puedan ser llamadas como modulo.

const express = require("express")
const router = express.Router()
const { formCreate, getForms, getForm, deleteForm, getPenddingForms} = require("./functions/formFunctions.js")

// aca se construyen las rutas sobre router:

router.get("/",  async (req, res) => {

    try {

        const forms = await getForms()
        if (forms) return res.send({message: "forms getted", response: forms})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/pendding",  async (req, res) => {

    try {

        const forms = await getPenddingForms()
        if (forms) return res.send({message: "pendding forms getted", response: forms})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params 

    try {

        const form = await getForm(id)
        if (form) return res.send({message: `forms id:${id} getted`, response: form})

    } catch (e) {
        
        res.status(400).send(e.message)
    
    }

})

router.post("/:id",  async (req, res) => {

    const { 
            period, 
            priceA, 
            qualityA,
            quantityA,
            priceB, 
            qualityB,
            quantityB,
            priceC, 
            qualityC,
            quantityC
        } = req.body
    
    const { id } = req.params
    //validation

    if (!id ||
        !period
        ) {
        
            throw new Error("missing data")

    }

    try {

        const newForm = await formCreate(id, req.body)
        if (newForm) return res.send({message: `form created for playerID ${id}`, response: newForm})

    } catch (e) {

        res.status(400).send(e.message)
    
    }
})

module.exports = router