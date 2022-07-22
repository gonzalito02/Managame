import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResultsPlayerById } from "../../../redux/actions/actions";
import NavBar from "../../NavBar";
import PlayerSalesTable from "./PlayerSalesTable";

export default function PlayerSales () {

    // const dispatch = useDispatch()

    // var loginUser = useSelector(state => state.loginUser)

    // useEffect(() => {
    //     if (loginUser && loginUser.rol === "player") dispatch(getResultsPlayerById(loginUser.id))
    // }, [dispatch, loginUser])

    return (
        <>
            <NavBar/>
        <h3>
            Registro de compras
        </h3>
            <PlayerSalesTable/>
        </>
    )

}