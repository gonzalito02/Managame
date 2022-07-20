const { Player, Rol, DinamicForm, ActionData } = require("C:/Users/gonza/Desktop/Managame/Managame/back/src/db.js")
const bcrypt = require("bcrypt");

async function playerCreate ({id, officialName, fantasyName, group, members, password}) {

    try {

    const genSalt = await bcrypt.genSalt(5);
    
    const hash = bcrypt.hashSync(password, genSalt);

    const newPlayer = await Player.create({
        id: id,
        officialName: officialName,
        fantasyName: fantasyName,
        group: group,
        members: members,
        password: hash,
        index: 100
    })

    const role = await Rol.findOne({ where: { name: "player" }});

    await role.addPlayer(newPlayer);

    if (newPlayer) return newPlayer

    } catch (e) {
        throw new Error("Cannot create the player, maybe conflict id. Try again.")
    }

}

async function getPlayers () {

    try {

    const players = await Player.findAll({
//        include: [{model: DinamicForm}]
    })

    if (players) return players

    } catch (e) {
        throw new Error("No players found")
    }

}

async function getPlayer (id) {

    try {

    const player = await Player.findByPk(id, {
                include: [{model: DinamicForm}, {model: ActionData}]
    })

    if (player) return player

    } catch (e) {
        throw new Error(`No player found with the playerId: ${id}`)
    }

}

async function updatePlayer (id, {officialName, fantasyName, group, members, password, resultAcc, index}) {

    try {

    //const player = await Player.findByPk(id)

        if (officialName) {
            await Player.update(
            {
                officialName: officialName,
            },
            {
                where: { id: id },
            }
            );
        }
        if (fantasyName) {
            await Player.update(
            {
                fantasyName: fantasyName,
            },
            {
                where: { id: id },
            }
            );
        }
        if (group) {
            await Player.update(
            {
                group: group,
            },
            {
                where: { id: id },
            }
            );
        }
        if (members) {
            await Player.update(
            {
                members: members,
            },
            {
                where: { id: id },
            }
            );
        }
        if (password) {
            await Player.update(
            {
                password: password,
            },
            {
                where: { id: id },
            }
            );
        }
        if (resultAcc) {
            await Player.update(
            {
                resultAcc: resultAcc,
            },
            {
                where: { id: id },
            }
            );
        }
        if (index) {
            await Player.update(
            {
                index: index,
            },
            {
                where: { id: id },
            }
            );
        }

    return {message: "Updated", id: id}

    } catch (e) {
        throw new Error(`Cannot update the player with the playerId: ${id}`)
    }

}




module.exports = { playerCreate, getPlayers, getPlayer, updatePlayer }