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

    var valor = 0
    var [errors, setErrors] = useState({
        decimal:"",
        integer:"",
        total:""
    })

    var [form, setForm] = useState({
        playerID: 1002, 
        period: period,  
        initialCapital: initialCapital, 
        priceA: 0, 
        qualityA: 0,
        quantityA: 0,
        priceB: 0, 
        qualityB: 0,
        quantityB: 0,
        priceC: 0, 
        qualityC: 0,
        quantityC: 0,
        qualityInvestment: 0,
        finantialFixedInvestment: 0
    })

    //function to modify and control the values

    const changeValue = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const decimalControl = (e) => {
        if (e.target.value > 1 || e.target.value < 0) setErrors({...errors, decimal: "Debe ser un valor decimal menor que 1 y mayor que 0, multiplo de 0,10"})
        else if (e.target.name.slice(0,8) === "quantity" && e.target.value * 100 % 10 !== 0) setErrors({...errors, decimal: "Debe ser un decimal multiplo de 0,10"})
        else setErrors({...errors, decimal:""})
    }

    const integerControl = (e) => {
        if (e.target.value > 100000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 100000 y mayor que 0"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value < 0) setErrors({...errors, integer: "No pueden haber números negativos"})
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
                        % de planta / Tasa 
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
                        <span>$ {form.quantityA * productionCapacity}</span>
                    </td>
                    <td>
                        <input name="quantityA" value={form.quantityA} type="number" onChange={(e) => {changeValue(e); decimalControl(e)}}/>
                    </td>
                    <td>
                        <span>{form.quantityA * productionCapacity / costProdA} un.</span>
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
                        <span>$ {form.quantityB * productionCapacity}</span>
                    </td>
                    <td>
                        <input name="quantityB" value={form.quantityB} type="number" onChange={(e) => {changeValue(e); decimalControl(e)}}/>
                    </td>
                    <td>
                        <span>{form.quantityB * productionCapacity / costProdB} un.</span>
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
                        <span>$ {form.quantityC * productionCapacity}</span>
                    </td>
                    <td>
                        <input name="quantityC" value={form.quantityC} type="number" onChange={(e) => {changeValue(e); decimalControl(e)}}/>
                    </td>
                    <td>
                        <span>{form.quantityC * productionCapacity / costProdC} un.</span>
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
                        <input name="qualityC" value={form.qualityC} type="number" onChange={(e) => {changeValue(e); integerControl(e)} }/>
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
                        Inversión a plazo conocido y tasa fija inicial.
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Inversión Financiera Variable.
                    </td>
                    <td>
                        Inversión dinámica. Una vez creada la posición, se debe cerrar la misma. Tasa máxima de rendimiento: 30%
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>

                <tr>
                    <td>
                        Préstamo.
                    </td>
                    <td>
                        Tasa mínima 20%. Monto máximo: $100.000
                    </td>
                    <td>
                        <input type="number" />
                    </td>
                    <td>
                        <input type="number" />
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
                        {valor}
                    </td>
                </tr>

            </tbody>
        </table>
        <h4>
            Control
            <ul>
            <li>Control decimales: {(errors.decimal !== "") ? errors.decimal : "OK"}</li>
            <li>Control enteros: {(errors.integer !== "") ? errors.integer : "OK"}</li>
            <li>Control totales: {(errors.total !== "") ? errors.total : "OK"}</li>
            </ul>
        </h4>
        <button type="submit" onClick={() => submitForm()}>Enviar</button>
        </>
    )
}