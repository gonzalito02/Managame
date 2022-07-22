import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createResultsData, getFormById, getGameControl, insertMarketLive, updateDataPlayer, validateForm } from "../../../redux/actions/actions";

export default function ValidateButtons ({data}) {

    const dispatch = useDispatch()
    const [stock, setStock] = useState([])

    const [submit, setSubmit] = useState(true)

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
        console.log("done")
    }, [dispatch, submit])

    const handlePass = (e) => {
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}
        dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 1, type: typo}))
        if(data.type === "actionForm") {
            dispatch(insertMarketLive(stock));
            dispatch(createResultsData(data.playerId, {
                period: data.period,
                qualityInvestment: data.qualityInvestment,
                finantialFixedInvestment: (data.finantialFixedInvestment)? (data.finantialFixedInvestment + data.finantialFixedRentability) : 0
            }))
        if(data.type === "investment") {
            dispatch(updateDataPlayer(data.playerId,{
                period: data.period,
                finantialInvestmentResults: (data.amount * (1 + data.rate))
            }))
        }
        if(data.type === "loan") {
            dispatch(updateDataPlayer(data.playerId,{
                period: data.period,
                loanInterest: (data.amount * data.rate)
            }))
        }
        }
        setSubmit(!submit)
    }

    const handleDenegate = (e) => {
        if(data.type === "loan" || data.type === "investment") {var typo = data.type} else {var typo = ""}
        dispatch(validateForm({playerId: data.playerId, period: data.period, validate: 2, type: typo}))
        if(data.type === "loan") {
            dispatch(updateDataPlayer(data.playerId,{
                period: data.period,
                loanInterest: data.amount
            }))
        }
        setSubmit(!submit)
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