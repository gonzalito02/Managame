const dataPlayer = [
    {   
        id: 1001,
        officialName: "EMPRESA A",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empA1001"
    },
    {   
        id: 1002,
        officialName: "EMPRESA B",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empB1002"
    },
    {   
        id: 1003,
        officialName: "EMPRESA C",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empC1003"
    },
    {   
        id: 1004,
        officialName: "EMPRESA D",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empD1004"
    },
    {   
        id: 1005,
        officialName: "EMPRESA E",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empE1005"
    },
    {   
        id: 1006,
        officialName: "EMPRESA F",
        group: "Presencial",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empF1006"
    },
    {   
        id: 1007,
        officialName: "EMPRESA G",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empG1007"
    },
    {   
        id: 1008,
        officialName: "EMPRESA H",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empH1008"
    },
    {   
        id: 1009,
        officialName: "EMPRESA I",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empI1009"
    },
    {   
        id: 1010,
        officialName: "EMPRESA J",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empJ1010"
    },
    {   
        id: 1011,
        officialName: "EMPRESA K",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empK1011"
    },
    {   
        id: 1012,
        officialName: "EMPRESA L",
        group: "Distancia",
        members: ["alumno 1","alumno 2","alumno 3"],
        password: "empL1012"
    },
    {   
        id: 1111,
        officialName: "CONTROLER",
        group: "omnipresente",
        members: ["unique"],
        password: "theChosenOne"
    }
]

const roles = [
    {
        name: "admin",
        description: "administrador"
    },
    {
        name: "player",
        description: "Player"
    },
    {
        name: "student",
        description: "Estudiante"
    }
]

const students = [
    {
        id: 38506528,
        name: "Gonzalo Rumi",
        password: "Chaplin02",
        email: "rumigonzalo@gmail.com",
        rol: "admin"
    },
    {
        id: 11111111,
        name: "Admin Game",
        password: "adminbusy1",
        email: "gonza0211@gmail.com",
        rol: "admin"
    },
    {
        id: 12345678,
        name: "Random Student",
        password: "Manzana12",
        email: "gonza0211@gmail.com",
        rol: "student"
    },
    {
        id: 99999999,
        name: "Big Buyer",
        password: "algoritmo2",
        email: "gonza0211@gmail.com",
        rol: "student"
    },

]

module.exports = { dataPlayer, students, roles }