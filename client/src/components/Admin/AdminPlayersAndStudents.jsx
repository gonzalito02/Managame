import React from "react";
import NavBar from "../NavBar";
import AdminPlayers from "./AdminPlayers/AdminPlayers";
import AdminStudents from "./AdminStudents/AdminStudents";

export default function AdminPlayersAndStudents () {

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