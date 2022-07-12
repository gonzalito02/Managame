import React, { useEffect } from "react";
import FormActionCreate from "./FormActionCreate";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { getFormById, getGameControl } from "../redux/actions/actions";
import ActionFormTable from "./ActionFormTable/ActionFormTable";
import PlayerData from "./PlayerData";

// aca van los formularios de creación de plan de acción, form de inversiones, prestamos y demas.

export default function PlayerControl () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    useEffect(() => {
        dispatch(getGameControl());
        dispatch(getFormById(1002));
    }, [dispatch])


    return (
        <>
        <div>
            Esto es el control de la empresa
        </div>
        <NavBar gameControl={gameControl}></NavBar>
        <h3>
            Planes de acción presentados
        </h3>
        <ActionFormTable />
        <h2>
            Formulario - Plan de acción
        </h2>
        <FormActionCreate />
        <h2>
            Player - Modificación de datos
        </h2>
        <PlayerData playerID={1002}/>
        </>
    )

}