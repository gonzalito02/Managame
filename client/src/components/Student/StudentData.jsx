import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Table from "react-bootstrap/esm/Table"
import { useDispatch, useSelector } from "react-redux"
import { getStudentById, updateDataStudent } from "../../redux/actions/actions"


export default function StudentData () {

    const dispatch = useDispatch()

    var student = useSelector(state => state.userLogin)
    var dataStudent = useSelector(state => state.dataStudentId)

    var [submit, setSubmit] = useState(true)

    useEffect(() => {
        dispatch(getStudentById(student.id))
    }, [dispatch, submit, student])

    var { id, name, wallet, email, rolName } = dataStudent

    const [form, setForm] = useState({
        email,
    })

    const [input, setInput] = useState(true)

    const handleInput = () => {
        if (!input) dispatch(updateDataStudent(id, form), setSubmit(!submit))
        setForm({
            email: email,
        });
        setInput(!input)
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <>
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Student Data</h2>
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
                                ID
                            </td> 
                            <td> 
                                {id} 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Nombre
                            </td> 
                            <td> 
                                {name} 
                            </td> 

                        </tr>
                  
                        <tr>
                            
                            <td>
                                Email
                            </td>
                            
                            {input? 
                            <td> {email} </td> :
                            <input name="email" value={form.email} onChange={(e) => handleChange(e)}></input>
                            }

                        </tr>

                        <tr>

                            <td>
                                Role
                            </td> 
                            <td> 
                                {rolName} 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Billetera
                            </td> 
                            <td> 
                                {wallet} 
                            </td> 

                        </tr>
    
                </tbody>
            </Table>
            <Button onClick={()=> handleInput()}>{input? "Modificar":"Aplicar"}</Button>
        </>
    )
}