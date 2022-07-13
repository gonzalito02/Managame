import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGameControl } from "../redux/actions/actions";
import Market from "./Market/Market";
import NavBar from "./NavBar";
import PlayerTable from "./PlayersTable/PlayerTable";

export default function Home () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)

    useEffect(() => {
        dispatch(getGameControl());
    }, [dispatch])

    return (
        <>
        <h1>
            Welcome to Managame!
        </h1>
            <NavBar />

        <div>
            <PlayerTable />
        </div>
        <div>
            <Market />
        </div>
        </>

    )
}