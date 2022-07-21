import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPlayers } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminActionFormTableValidated from "./AdminActionFormTableValidated/AdminActionFormTableValidated";
import AdminPlayers from "./AdminPlayers/AdminPlayers";
import AdminStudents from "./AdminStudents/AdminStudents";


export default function AdminPlayersAndStudents () {

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getAllPlayers())
    // }, [dispatch])

    return (
        <>  
            <NavBar />
            <h2>
                Players.
            </h2>
            <AdminPlayers />
            <h2>
                Students / Customers
            </h2>
            <AdminStudents />
        </>
    )

}