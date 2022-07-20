import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDinamicForm, getFormById } from "../../../redux/actions/actions";

export default function InvestmentCloser ({data}) {

    var { amount, rate, description, status, period } = data

    var loginData = useSelector(state => state.userLogin)

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        amount,
        rate,
        description
    })

    useEffect(() => {
        dispatch(getFormById(loginData.id))
    }, [dispatch, loginData])

    const [input, setInput] = useState(true)

    const handleInput = (e) => {
        if (!input) {dispatch(closeDinamicForm(form))}
        else {
            setForm({
                playerId: loginData.id,
                period: period,
                amount: amount,
                rate, rate,
                description: description
            })
        }
        setInput(!input)
    }

    const handleChange = (e) => {
        if (e.target.name === "amount") var value = parseInt(e.target.value)
        else if (e.target.name === "rate") var value = parseFloat(e.target.value)
        else var value = e.target.value
        setForm({...form, [e.target.name]: value})
    }

    return (

        <>
            <button disabled={status} onClick={()=> handleInput()}>{input? "Modificar":"Cerrar posición"}</button>
            <table>
                <tbody>
                        <tr>      
                            <td>
                                Amount
                            </td>
                            
                            {input? 
                            <td> {amount} </td> :
                            <input name="amount" type="number" value={form.amount} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                Rate
                            </td>
                            
                            {input? 
                            <td> {rate} </td> :
                            <input name="rate" type="number" value={form.rate} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>
                            
                            <td>
                                Description
                            </td>
                            
                            {input? 
                            <td> {description} </td> :
                            <input name="description" type="text" value={form.description} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>
                </tbody>
            </table>
        </>
    )
}