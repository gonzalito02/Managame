// aca, ademas de los botones para controlar el juego, tmb poner los controles para autorizar o no una inversión o prestamo.

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllForms, getGameControl } from "../../redux/actions/actions";
import NavBar from "../NavBar";

export default function AdminControl () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    useEffect(() => {
        dispatch(getGameControl());
        dispatch(getAllForms())
    }, [dispatch])

    return (
        <>
        <div>
            Esto es el control del administrador
        </div>
        <NavBar gameControl={gameControl}></NavBar>
        <h2>
            Controles de juego
        </h2>
        <h2>
            Formulario pendientes de aprobación.
        </h2>
        <h2>
            Formularios evaluados
        </h2>
        </>
    )

}