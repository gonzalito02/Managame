import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import {getMarketLive} from "../../redux/actions/actions"
import { CSVLink } from "react-csv";

export default function UpdatePlayerMarket () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)

    useEffect(() => {
        dispatch(getMarketLive())
    }, [])

    const [data, setData] = useState({playerId: "", typeProduct: "", qualityProduct: 0, stockProduct: 0})

    const handleClick = () => {
        // dispatch(updateResultsData(data.playerId, amount))
        console.log("done")
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <>
        <Form>
        <Form.Control value={data.playerId} type="number" onChange={(e) => {handleChange(e)}} placeholder="playerId">
        </Form.Control>
        <Form.Control value={data.typeProduct} type="text" onChange={(e) => {handleChange(e)}} placeholder="typeProduct">
        </Form.Control>
        <Form.Control value={data.qualityProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="qualityProduct">
        </Form.Control>
        <Form.Control value={data.stockProduct} type="number" onChange={(e) => {handleChange(e)}} placeholder="stockProduct">
        </Form.Control>
        <Button onClick={(e) => handleClick()}>
            Update Market Values
        </Button>
        <CSVLink data={market}><Button>Download Market CSV</Button></CSVLink>
        </Form>
        </>
    )
}