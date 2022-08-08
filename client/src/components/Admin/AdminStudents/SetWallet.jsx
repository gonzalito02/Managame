import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { setWallet } from "../../../redux/actions/actions";

export default function SetWallet () {

    const dispatch = useDispatch()
    var [valueWallet, setValueWallet] = useState({value: 0})

    const handleChange = (e) => {
        setValueWallet({value: e.target.value})
    }

    const handleSubmit = () => {
        dispatch(setWallet(valueWallet))
        console.log("done")
    }

    return (

        <>
            <div>
                <Button onClick={(e) => handleSubmit()}>Set Wallet</Button>
                <input value={valueWallet.value} type="number" onChange={(e) => handleChange(e)}></input>
            </div>
        </>
    )
} 