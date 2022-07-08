import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGameControl } from "../redux/actions/actions";
import PlayerTable from "./PlayersTable/PlayerTable";

export default function Home () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    console.log(gameControl.response[0].variables)

    useEffect(() => {
        dispatch(getGameControl())
    }, [dispatch])

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
            <div>
                <span>Controladores del juego:</span>
                <span>{gameControl.response[0].variables.QuanlityInvCost}</span>
            </div>
        </div>
        </>

    )
}