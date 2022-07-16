import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createActionForm } from "../../redux/actions/actions";


export default function FormActionCreate () {

    const dispatch = useDispatch()

    var gameControl = useSelector(state => state.gameControl)
    var loginData = useSelector(state => state.userLogin)

    var {
        period,
        qualityInvCost,
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

    const changeValue = (e) => {
        var value = parseInt(e.target.value)
        value = value || ""
        setForm({...form, [e.target.name]: value})
    }

    const integerControl = (e) => {
        if (e.target.value > 1000000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 1000000 y mayor que 0"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
        // else if (e.target.name.slice(0,7) === "quality" && e.target.value < 0) setErrors({...errors, integer: "No pueden haber números negativos"})
        // else if (e.target.name.slice(0,8) === "quantity" && e.target.value % 5 !== 0) setErrors({...errors, integer: "Debe ser un multiplo de 5"})
        else setErrors({...errors, integer:"", general: ""})
    }

    var controlProd = ((form.quantityA * costProdA) / (productionCapacity / 100)) +
                      ((form.quantityB * costProdB) / (productionCapacity / 100)) +
                      ((form.quantityC * costProdC) / (productionCapacity / 100))

    if (controlProd > (minProductCapacity*2) && errors.general === "") {
        setErrors({...errors, general: `La capacidad de la planta en general no puede superar el ${minProductCapacity*2}%`})
    }
    if (controlProd < minProductCapacity && errors.general === "") {
        setErrors({...errors, general: `La capacidad de la planta no puede ser inferior al ${minProductCapacity}%`})
    }
    if (form.finantialFixedInvestment > maxTotalFinInvestAmount && errors.general === "") {
        setErrors({...errors, general: "Monto máximo de inversión financiera superado"})
    }
    if ( (form.finantialFixedRentability / form.finantialFixedInvestment) > maxRateFinFixedInvest && errors.general === "") {
        setErrors({...errors, general: "La tasa de rentabilidad es superior a la permitida"})
    }

    const submitForm = () => {
        const formul = {
            period: period,
            priceA: form.priceA,
            qualityA: form.qualityA,
            quantityA: form.quantityA,
            priceB: form.priceB,     
            qualityB: form.qualityB, 
            quantityB: form.quantityB, 
            priceC: form.priceC,
            qualityC: form.qualityC,
            quantityC: form.quantityC,
            qualityInvestment: (form.qualityA + form.qualityB + form.qualityC) * qualityInvCost, 
            finantialFixedInvestment: form.finantialFixedInvestment,
            finantialFixedRentability: form.finantialFixedRentability
        }
        const stock = []
        if (form.quantityA > 0) stock.push({id: 1002, insert: {
            period: period,
            typeProduct: "A",
            stockProduct: form.quantityA,
            qualityProduct: form.qualityA,
            priceProduct: form.priceA
            }})
        if (form.quantityB > 0) stock.push({id: 1002, insert: {
            period: period,
            typeProduct: "B",
            stockProduct: form.quantityB,
            qualityProduct: form.qualityB,
            priceProduct: form.priceB
            }})
        if (form.quantityC > 0) stock.push({id: 1002, insert: {
            period: period,
            typeProduct: "C",
            stockProduct: form.quantityC,
            qualityProduct: form.qualityC,
            priceProduct: form.priceC
            }})
        dispatch(createActionForm(1002, formul, stock)) 
    }

    var disabled = true

    if (
        errors.general === "" &&
        errors.integer === "" &&
        errors.total === ""
        ) { disabled = false}

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
                        Valor
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
                        Indicar la cantidad a generar del producto A. Cada producto consumo 2% de uso de planta.
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
                        Inversión en calidad del producto A. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityA * qualityInvCost}</span>
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
                        Indicar la cantidad a generar del producto B. Cada producto consumo 1% de uso de planta.
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
                        Inversión en calidad del producto B. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityB * qualityInvCost}</span>
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
                        Indicar la cantidad a generar del producto C. Cada producto consumo 0,5% de uso de planta.
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
                        Inversión en calidad del producto C. Costo por punto de calidad: {qualityInvCost}
                    </td>
                    <td>
                        <span>$ {form.qualityC * qualityInvCost}</span>
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
                        Totales
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        -
                    </td>
                    <td>
                        {controlProd} %
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
                        <input name="finantialFixedRentability" value={form.finantialFixedRentability} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
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
                           ((form.qualityA + form.qualityB + form.qualityC ) * qualityInvCost) +
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
        <button type="submit" disabled={disabled} onClick={() => submitForm()}>Enviar</button>
        </>
    )
}