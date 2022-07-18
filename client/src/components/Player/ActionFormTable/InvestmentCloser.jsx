import React from "react";

export default function InvestmentCloser ({data}) {

    var { amount, status, rate } = data

    return (

        <>
            <div>
                <li>Monto: {amount}</li>
                <li>Tasa: {rate * 100}%</li>
                <li>Ganancia esperada: {(rate + 1) * amount}</li>
            </div>
            <div>
                <span>Actualizar tasa: </span>
                <input></input>
                <span>Link a la justificación: </span>
                <input></input>
                <button>Cerrar posición</button>
            </div>
        </>
    )
}