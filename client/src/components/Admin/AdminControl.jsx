import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllForms, getGameControl } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminActionFormTable from "./AdminActionFormTable/AdminActionFormTable";
import AdminActionFormTableValidated from "./AdminActionFormTableValidated/AdminActionFormTableValidated";
import SetWallet from "./AdminStudents/SetWallet";
import GameControl from "./GameControl";

export default function AdminControl () {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllForms())
    }, [dispatch])

    return (
        <>
            <NavBar />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Controles de juego
        </h2 >
            <GameControl />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Billetera
        </h2>
            <SetWallet />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Formularios presentados.
        </h2>
            <AdminActionFormTable />
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
            Formularios evaluados
        </h2>
            <AdminActionFormTableValidated />
        </>
    )

}