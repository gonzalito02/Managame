import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getGameControl } from "../redux/actions/actions";
import MarketStaticTable from "./Market/MarketStaticTable/MarketStaticTable";
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
            <MarketStaticTable />
        </>

    )
}