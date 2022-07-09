import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGameControl } from "../redux/actions/actions";
import NavBar from "./NavBar";
import PlayerTable from "./PlayersTable/PlayerTable";

export default function Home () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    useEffect(() => {
        dispatch(getGameControl())
    }, [dispatch])

    return (
        <>
        <h1>
            Welcome to Managame!
        </h1>
        <NavBar gameControl={gameControl}></NavBar>

        <div>
            <PlayerTable />
            <div>
                <span>Controladores del juego:</span>
            </div>
        </div>
        </>

    )
}