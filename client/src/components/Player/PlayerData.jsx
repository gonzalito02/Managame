import React, { useEffect, useMemo, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
import { useDispatch, useSelector } from "react-redux"
import { getPlayerById, updateDataPlayer } from "../../redux/actions/actions"


export default function PlayerData ({playerID}) {

    const dispatch = useDispatch()

    var dataPlayer = useSelector(state => state.dataPlayerId)

    var [submit, setSubmit] = useState(true)

    useEffect(() => {
        dispatch(getPlayerById(playerID))
    }, [dispatch, playerID, submit])

    var { id, fantasyName, members, officialName, resultsAcc, group } = dataPlayer

    const [form, setForm] = useState({
        fantasyName,
        members,
    })

    const [input, setInput] = useState(true)

    const handleInput = () => {
        if (!input) dispatch(updateDataPlayer(playerID, form), setSubmit(!submit))
        setForm({
            fantasyName: fantasyName,
            members: members
        });
        setInput(!input)
    }

    const handleChange = (e) => {
        if (e.target.name === "fantasyName") var value = e.target.value
        else var value = e.target.value.split(",")
        setForm({...form, [e.target.name]: value})
    }

    return (
        <>
            <Table>
                <thead>
                        <tr>
                            <th>
                                Concepto
                            </th>
                            <th>
                                Valor
                            </th>
                        </tr>
                </thead>
                <tbody>
                        <tr>

                            <td>
                                Razón Social
                            </td> 
                            <td> 
                                {officialName} 
                            </td> 

                        </tr>
                  
                        <tr>
                            
                            <td>
                                Nombre de fantasía
                            </td>
                            
                            {input? 
                            <td> {fantasyName} </td> :
                            <input name="fantasyName" value={form.fantasyName} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                Integrantes
                            </td>
                            
                            {input? 
                            <td> 
                                {members? members.toString() : null}
                            </td> :
                            <input name="members" value={form.members} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            <td>
                                Extra data
                            </td>
                            <td>
                                {`Resultados Acumulados: $ ${resultsAcc}; Grupo: ${group}; PlayerID: ${id}`}
                            </td>
                        </tr>
    
                </tbody>
            </Table>
            <Button onClick={()=> handleInput()}>{input? "Modificar":"Aplicar"}</Button>
        </>
    )
}