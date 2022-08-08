import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateResultsData } from "../../../redux/actions/actions";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

export default function AddExtraResult ({data}) {

    const dispatch = useDispatch()

    const [amount, setAmount] = useState({period: data.period, extraResults: 0, observations: data.observations})

    const handleClick = () => {
        dispatch(updateResultsData(data.playerId, amount))
        console.log("done")
    }

    const handleChange = (e) => {
        setAmount({...amount, extraResults: e.target.value})
    }

    const handleObs = (e) => {
        setAmount({...amount, observations: e.target.value})
    }

    return (
        <Form>
        <Form.Control value={amount.extraResults} type="number" onChange={(e) => {handleChange(e)}} placeholder="extraResults">
        </Form.Control>
        <Form.Control value={amount.observations} type="text" onChange={(e) => {handleObs(e)}} placeholder="observations">
        </Form.Control>
        <Button onClick={(e) => handleClick()}>
            Add
        </Button>
        </Form>
    )
}