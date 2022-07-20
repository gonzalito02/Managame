import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client"
import NavBar from "../NavBar";
import MarketLiveTable from "./MarketLiveTable/MarketLiveTable";

const socket = io.connect("http://localhost:3002")

export default function Market () {

    const loginData = useSelector(state => state.userLogin)

    const sendMessage = () => {
        socket.emit("sendMessage", {message: "hello"})
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            alert(data.message)
        })
    }, [socket])

    return (

        <div>
            <NavBar />
            <input></input>
            <button onClick={() => sendMessage()}>Send the message</button>
            <MarketLiveTable />
        </div>
    )
}