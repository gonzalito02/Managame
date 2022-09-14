import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { insertMarketLive } from "../../../redux/actions/actions";

export default function InsertMarket () {

    const dispatch = useDispatch()
    
    var [stock, setStock] = useState({
        playerId: "",
        period: "",
        typeProduct: "",
        stockProduct: "",
        qualityProduct: "",
        priceProduct: ""
    })

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleStock = (e) => {
        if (e.target.name === "typeProduct") {
            var val = e.target.value
        } else {
            var val = parseInt(e.target.value)
        }
        setStock({...stock, [e.target.name]: val})
    }

    const handleSubmit = () => {
        var charge = [{
            id: stock.playerId,
            insert: {
                period: stock.period,
                typeProduct: stock.typeProduct,
                stockProduct: stock.stockProduct,
                qualityProduct: stock.qualityProduct,
                priceProduct: stock.priceProduct
            }
        }]
        dispatch(insertMarketLive(charge))
        Toast.fire({
            icon: 'success',
            title: 'Setting up the wallet xd'
        })
    }

    return (

        <>
            <Container>

                <Table>

                <tbody>

                        <tr>
                            <td>
                                Player Id
                            </td> 
                            <td> 
                                <input name="playerId" type="number" value={stock.playerId} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>
                        <tr>

                            <td>
                                Period
                            </td> 
                            <td> 
                                <input name="period" type="number" value={stock.period} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Type
                            </td> 
                            <td> 
                                <input name="typeProduct" type="text" value={stock.typeProduct} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Stock
                            </td> 
                            <td> 
                                <input name="stockProduct" type="number" value={stock.stockProduct} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Quality
                            </td> 
                            <td> 
                                <input name="qualityProduct" type="number" value={stock.qualityProduct} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>

                        <tr>

                            <td>
                                Price
                            </td> 
                            <td> 
                                <input name="priceProduct" type="number" value={stock.priceProduct} onChange={(e) => handleStock(e)}></input> 
                            </td> 

                        </tr>
                </tbody>

                </Table>

                <Button onClick={() => handleSubmit()}>Insert</Button>

            </Container>
        </>
    )
} 