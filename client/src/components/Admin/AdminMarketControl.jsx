import React, { useEffect } from "react";
import { checkLog } from "../../redux/actions/actions";
import NavBar from "../NavBar";
import AdminMarket from "./AdminMarket/AdminMarket";
import InsertMarket from "./AdminMarket/InsertMarket";
import SetAdminWallet from "./AdminMarket/SetAdminWallet";
import SetWallet from "./AdminMarket/SetWallet";

export default function AdminMarketControl () {

    useEffect(() => {
        checkLog("admin")  
    }, [])

    return (
        <>  
                <NavBar />

            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Wallet and Market Destroy
            </h2>
            
                <SetWallet />

            <h3 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Set individual wallet
            </h3>
                <SetAdminWallet />

            <h3 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Insert Market
            </h3>
                <InsertMarket />

            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>
                Market.
            </h2>
                <AdminMarket />
        </>
    )

}