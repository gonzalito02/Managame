import React from "react";
import { useState } from "react";
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
                <button onClick={(e) => handleSubmit()}>Set Wallet</button>
                <input value={valueWallet.value} type="number" onChange={(e) => handleChange(e)}></input>
            </div>
        </>
    )
} 