import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFormById, getGameControl } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import ActionFormTable from "./ActionFormTable/ActionFormTable";
import FormActionCreate from "./FormActionCreate";
import PlayerData from "./PlayerData";

export default function PlayerControl () {

    const dispatch = useDispatch()

    var loginUser = useSelector(state => state.userLogin)

    const idt = loginUser.id 

    useEffect(() => {
        dispatch(getFormById(idt));
    }, [dispatch, loginUser])


    return (
        <>
        <NavBar/>
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
        <PlayerData playerID={idt}/>
        </>
    )

}