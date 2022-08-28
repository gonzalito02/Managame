//? create role
const { Rol } = require('../../db');

async function createRole(data) {

    const { name, description } = data;
    try {

        const role = await Rol.create({
            name,
            description
        })
        
        if (role) return role 

    } catch (e) {
        throw new Error("Cannot create the role. Try again.")
    }
};

async function getRoles() {

    try {

        const roles = await Rol.findAll({})

        if (roles) return roles 

    } catch (error) {

        throw new Error("Cannot get the roles. Try again.")
    
    }
}

module.exports = { createRole, getRoles };