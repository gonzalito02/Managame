import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateResultsData } from "../../../redux/actions/actions";

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
        <div>
        <input value={amount.extraResults} type="number" onChange={(e) => {handleChange(e)}}>
        </input>
        <input value={amount.observations} type="text" onChange={(e) => {handleObs(e)}}>
        </input>
        <button onClick={(e) => handleClick()}>
            Add
        </button>
        </div>
    )
}