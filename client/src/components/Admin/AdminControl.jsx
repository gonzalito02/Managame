// aca, ademas de los botones para controlar el juego, tmb poner los controles para autorizar o no una inversión o prestamo.

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
        <h2>
            Controles de juego
        </h2>
            <GameControl />
        <h2>
            Billetera
        </h2>
            <SetWallet />
        <h2>
            Formularios presentados.
        </h2>
            <AdminActionFormTable />
        <h2>
            Formularios evaluados
        </h2>
            <AdminActionFormTableValidated />
        </>
    )

}