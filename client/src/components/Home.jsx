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

    useEffect(() => {
        dispatch(getGameControl());
    }, [dispatch])

    return (
        <>
            <NavBar />     
            <PlayerTable />
        <h3>
            Mercado actual
        </h3>
            <MarketLiveTable />
        </>

    )
}