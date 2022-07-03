const express = require("express")
const router = express.Router()
const { Player } = require('../db.js')

// aca se construyen las rutas sobre router:

const dataPlayer = [
    {   
        id: 1001,
        officialName: "EMPRESA A",
        group: "Presencial",
        members: ["gonzalito","gonzalo","gonza"],
        password: "naranja123"
    }
]

router.post("/",  async (req, res) => {
    let { id, officialName, group, members, password } = req.body

    if (!id || !officialName || !group || !members || !password) res.json({error:true, message: "faltan datos"})

    try {
    
    const newPlayer = await Player.create({
        id: id,
        officialName: officialName,
        group: group,
        members: members,
        password: password
    })
    
    console.log(newPlayer)

    res.send({error:false, message: "player created"})

    } catch (e) {
        res.send(e.message)
    }
})





module.exports = router