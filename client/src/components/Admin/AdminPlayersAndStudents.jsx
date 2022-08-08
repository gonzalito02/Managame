import React from "react";
import NavBar from "../NavBar";
import AdminPlayers from "./AdminPlayers/AdminPlayers";
import AdminStudents from "./AdminStudents/AdminStudents";

export default function AdminPlayersAndStudents () {

    return (
        <>  
                <NavBar />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Players.
            </h2>
                <AdminPlayers />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Students / Customers
            </h2>
                 <AdminStudents />
        </>
    )

}