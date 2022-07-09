import React, { useEffect } from "react";
import FormActionCreate from "./FormActionCreate";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { getGameControl } from "../redux/actions/actions";

// aca van los formularios de creación de plan de acción, form de inversiones, prestamos y demas.

export default function PlayerControl () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    useEffect(() => {
        dispatch(getGameControl())
    }, [dispatch])


    return (
        <>
        <div>
            Esto es el control de la empresa
        </div>
        <NavBar gameControl={gameControl}></NavBar>
        <h3>
            RESULTADOS
        </h3>

        <h3>
            FORMULARIOS ENVIADOS
        </h3>

        <h3>
            FORMULARIO DE PLAN DE ACCIÓN
        </h3>
        <FormActionCreate />
        </>
    )

}