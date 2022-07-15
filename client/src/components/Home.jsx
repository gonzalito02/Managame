import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGameControl } from "../redux/actions/actions";
import Market from "./Market/Market";
import MarketLiveTable from "./Market/MarketLiveTable/MarketLiveTable";
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
        <h3>
            Mercado actual
        </h3>
        <div>
            <MarketLiveTable />
        </div>
        </>

    )
}