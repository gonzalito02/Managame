import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDataPlayer } from "../../../redux/actions/actions";

export default function UpdatePlayer ({data}) {

    const dispatch = useDispatch()

    var [submit, setSubmit] = useState(true)
    const [input, setInput] = useState(true)

    var { 
        id,
        index,
        initialCapital,
        group,
     } = data

    const [form, setForm] = useState({
        index,
        initialCapital,
        group,
    })

    const handleInput = () => {
        if (!input) {dispatch(updateDataPlayer(id, form)); setSubmit(!submit); console.log("aca")}
        else {
        setForm({
            index: index,
            initialCapital: initialCapital,
            group: group,
        });
        }
        setInput(!input)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <>        
            <table>
                <tbody>            
                        <tr>    
                            <td>
                                Group
                            </td>
                            
                            {input? 
                            <td> {group} </td> :
                            <input name="group" type="text" value={form.group} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>
                        <tr>    
                            <td>
                                Index
                            </td>
                            
                            {input? 
                            <td> {index} </td> :
                            <input name="index" type="number" value={form.index} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>
                        <tr>    
                            <td>
                                Initial Capital
                            </td>
                            
                            {input? 
                            <td> {initialCapital} </td> :
                            <input name="initialCapital" type="number" value={form.initialCapital} onChange={(e) => handleChange(e)}></input>
                            }
                        </tr>
                </tbody>
            </table>
            <button onClick={()=> handleInput()}>{input? "Modificar":"Aplicar"}</button>
        </>
    )
}