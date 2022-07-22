import React from "react";
import NavBar from "../NavBar";
import AllPlayersResultsTable from "./PlayersResults/AllPlayersResultsTable";

export default function AdminPlayersResults () {

    return (
        <>  
                <NavBar />
            <h2>
                Players Results.
            </h2>
                <AllPlayersResultsTable />
        </>
    )

}