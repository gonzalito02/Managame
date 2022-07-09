import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function FormActionCreate () {

    var gameControl = useSelector(state => state.gameControl)

    var {
        period,
        QualityInvCost,
        initialCapital,
        productionCapacity,
        costProdA,
        costProdB,
        costProdC,
        minProductCapacity,
        minRateLoan,
        maxLoanAmount,
        maxRateFinDinInvest,
        maxRateFinFixedInvest,
        maxTotalFinInvestAmount
    } = gameControl

 

    var [errors, setErrors] = useState({
        integer:"",
        general: "",
        total:""
    })

    var [form, setForm] = useState({
        period: period,
        priceA: 0, 
        qualityA: 0,
        quantityA: 0,
        priceB: 0, 
        qualityB: 0,
        quantityB: 0,
        priceC: 0, 
        qualityC: 0,
        quantityC: 0,
        finantialFixedInvestment: 0,
        finantialFixedRentability: 0
    })

    var [formul, Setformul] = useState({
        playerID: 1002, 
        period: period,  
        initialCapital: initialCapital, 
    })

    console.log("game control", period, "formul", formul.period)

    //function to modify and control the values

    const changeValue = (e) => {
        var value = parseFloat(e.target.value)
        setForm({...form, [e.target.name]: value})
    }

    const generalControl = (e) => {
        if (e.target.value > 1 || e.target.value < 0) setErrors({...errors, general: "Debe ser un valor decimal menor que 1 y mayor que 0, multiplo de 0,10"})
        else if (e.target.name.slice(0,8) === "quantity" && e.target.value * 100 % 10 !== 0) setErrors({...errors, general: "Debe ser un decimal multiplo de 0,10"})
        else setErrors({...errors, general:""})
    }

    const integerControl = (e) => {
        if (e.target.value > 100000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 100000 y mayor que 0"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value < 0) setErrors({...errors, integer: "No pueden haber números negativos"})
        else if (e.target.name.slice(0,8) === "quantity" && e.target.value % 10 !== 0) setErrors({...errors, integer: "Debe ser un multiplo de 10"})
        else if (e.target.name.slice(0,8) === "quantity" && e.target.value > 100) setErrors({...errors, integer: "Capacidad de planta excedida"})
        else setErrors({...errors, integer:""})
    }

    const submitForm = () => {
        
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>
                        Concepto
                    </th>
                    <th>
                        Observación / Detalle
                    </th>
                    <th>
                        Input
                    </th>
                    <th>
                        % de planta
                    </th>
                    <th>
                        Puntos de Calidad / Stock 
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Precio A.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto A.
                    </td>
                    <td>
                        <input name="priceA" value={form.priceA} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de A.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto A. Recuerde que es por porcentajes múltiplos de 0,10.
                    </td>
                    <td>
                        <span>$ {form.quantityA * costProdA}</span>
                    </td>
                    <td>
                        <span> {(form.quantityA * costProdA) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityA" value={form.quantityA} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de A.
                    </td>
                    <td>
                        Inversión en calidad del producto A. Costo por punto de calidad: {QualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityA * QualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityA" value={form.qualityA} type="number" onChange={(e) => {changeValue(e); integerControl(e)} }/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio B.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto B.
                    </td>
                    <td>
                        <input name="priceB" value={form.priceB} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de B.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto B. Recuerde que es por porcentajes múltiplos de 0,10.
                    </td>
                    <td>
                        <span>$ {form.quantityB * costProdB}</span>
                    </td>
                    <td>
                        <span> {(form.quantityB * costProdB) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityB" value={form.quantityB} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de B.
                    </td>
                    <td>
                        Inversión en calidad del producto B. Costo por punto de calidad: {QualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityB * QualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityB" value={form.qualityB} type="number" onChange={(e) => {changeValue(e); integerControl(e)} }/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Precio C.
                    </td>
                    <td>
                        Indicar el precio de venta en el mercado del producto C.
                    </td>
                    <td>
                        <input name="priceC" value={form.priceC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                </tr>
                <tr>
                    <td>
                        Producción de C.
                    </td>
                    <td>
                        Indicar la cantidad a generar del producto C. Recuerde que es por porcentajes múltiplos de 0,10.
                    </td>
                    <td>
                        <span>$ {form.quantityC * costProdC}</span>
                    </td>
                    <td>
                        <span> {(form.quantityC * costProdC) / (productionCapacity / 100)} %</span>
                    </td>
                    <td>
                        <input name="quantityC" value={form.quantityC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Inversión en Calidad de C.
                    </td>
                    <td>
                        Inversión en calidad del producto C. Costo por punto de calidad: {QualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityC * QualityInvCost}</span>
                    </td>
                    <td>
                        -
                    </td>
                    
                    <td>
                        <input name="qualityC" value={form.qualityC} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Otros movimientos.
                    </td>
                </tr>

                <tr>
                    <td>
                        Inversión Financiera Fija.
                    </td>
                    <td>
                        Inversión a plazo conocido. Indicar en la primera celda el monto destinado, en la segunda la ganancia neta.
                    </td>
                    <td>
                        <input name="finantialFixedInvestment" value={form.finantialFixedInvestment} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <input name="finantialFixedResult" value={form.finantialFixedResult} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Inversión Financiera Variable.
                    </td>
                </tr>

                <tr>
                    <td>
                        Préstamo.
                    </td>
                </tr>

                <tr>
                    <td>
                        {null}
                    </td>
                    <td>
                        Total acumulado
                    </td>
                    <td>
                        {( form.quantityA * costProdA + 
                           form.quantityB * costProdB + 
                           form.quantityC * costProdC +
                           ((form.qualityA + form.qualityB + form.qualityC ) * QualityInvCost) +
                           form.finantialFixedInvestment)
                        }
                    </td>
                </tr>

            </tbody>
        </table>
        <h4>
            Control
            <ul>
            <li>Control general: {(errors.general !== "") ? errors.general : "OK"}</li>
            <li>Control enteros: {(errors.integer !== "") ? errors.integer : "OK"}</li>
            <li>Control totales: {(errors.total !== "") ? errors.total : "OK"}</li>
            </ul>
        </h4>
        <button type="submit" onClick={() => submitForm()}>Enviar</button>
        </>
    )
}