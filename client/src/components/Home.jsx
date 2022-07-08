import React from "react";
import { Link } from "react-router-dom";
import PlayerTable from "./PlayersTable/PlayerTable";

export default function Home () {

    return (
        <>
        <h1>
            Welcome to Managame!
        </h1>
        <div>
            <Link to="/player">
              <button>Go to player</button>
            </Link>
            <Link to="/admin">
              <button>Admin Control</button>
            </Link>
            <Link to="/market">
              <button>Market</button>
            </Link>
        </div>
        <div>
            <PlayerTable />
            Acá deben ir gráficos y demás info
        </div>
        </>

    )
}