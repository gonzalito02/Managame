const express = require("express")
const router = express.Router()

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

router.post("/", (req, res) => {
    
})





module.exports = router