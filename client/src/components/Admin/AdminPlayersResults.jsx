import React from "react";
import NavBar from "../NavBar";
import AllPlayersResultsTable from "./PlayersResults/AllPlayersResultsTable";

export default function AdminPlayersResults () {

    return (
        <>  
                <NavBar />
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Players Results.
            </h2>
                <AllPlayersResultsTable />
        </>
    )

}