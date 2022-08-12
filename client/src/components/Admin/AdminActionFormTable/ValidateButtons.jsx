import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createResultsData, insertMarketLive, submitUpdate, updateDataPlayer, updateResultsData, validateForm } from "../../../redux/actions/actions";

export default function ValidateButtons ({data}) {

    const dispatch = useDispatch()
    const [stock, setStock] = useState([])

    console.log(data)

    useEffect(() => {
        if (data) {
            if (data.type === "actionForm") {
                var stock = []
                if (data.quantityA > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "A",
                    stockProduct: data.quantityA,
                    qualityProduct: data.qualityA,
                    priceProduct: data.priceA
                    }})
                if (data.quantityB > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "B",
                    stockProduct: data.quantityB,
                    qualityProduct: data.qualityB,
                    priceProduct: data.priceB
                    }})
                if (data.quantityC > 0) stock.push({id: data.playerId, insert: {
                    period: data.period,
                    typeProduct: "C",
                    stockProduct: data.quantityC,
                    qualityProduct: data.qualityC,
                    priceProduct: data.priceC
                    }})
                setStock(stock)
            }
        }
    }, [dispatch])

    const handlePass = (e) => {
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}
        dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 1, type: typo}))
        if(data.type === "actionForm") {
            dispatch(insertMarketLive(stock));  
            dispatch(createResultsData(data.playerId, {
                period: data.period,
                qualityInvestment: data.qualityInvestment,
                finantialFixedInvestment: (data.finantialFixedInvestment)? (data.finantialFixedInvestment + data.finantialFixedRentability) : 0
        }))}
        
        if(data.type === "investment") {
            dispatch(updateResultsData(data.playerId,{
                period: data.period,
                finantialInvestmentResults: (data.amount * (1 + data.rate))
            }))
        }
        if(data.type === "loan") {
            console.log("toy aca bro", data.type)
            dispatch(updateResultsData(data.playerId,{
                period: data.clearingPeriod,
                loanInterest: (data.amount * data.rate)
            }))
        }
        dispatch(submitUpdate())
    }

    const handleDenegate = (e) => {
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}
        dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 2, type: typo}))
        if(data.type === "loan") {
            dispatch(updateResultsData(data.playerId,{
                period: data.clearingPeriod,
                loanInterest: data.amount
            }))
        }
        dispatch(submitUpdate())
    }

    return (
        <>
            <div>
                  <button onClick={e => handlePass(e)}>Validate</button>
                  <button onClick={e => handleDenegate(e)}>Denegate</button>
            </div>
        </>
    )
}