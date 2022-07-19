import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createActionForm } from "../../redux/actions/actions";


export default function FormActionCreate () {

    const dispatch = useDispatch()
    var gameControl = useSelector(state => state.gameControl)
    var loginData = useSelector(state => state.userLogin)
    var dataPlayer = useSelector(state => state.dataPlayerId)


    var { initialCapital } = dataPlayer

    if (dataPlayer.dinamicForms) {
        if (dataPlayer.dinamicForms.length > 1) {
            var loans = dataPlayer.dinamicForms.filter(m => m.type === "loan" &&
            m.clearingPeriod === gameControl.period)
            if (loans.length > 0) var netLoan = (loans[0].amount * (loans[0].rate + 1))
            else netLoan = 0
        }
        else var loans = null
    } 
    else var loans = null

    const {
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

    const [errors, setErrors] = useState({
        integer:"",
        general: "",
        dinform: "",
        total:""
    })

    const [form, setForm] = useState({
        period: gameControl.period,
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
    
    const [investmentForm, setInvestmentForm] = useState({
        period: gameControl.period,
        type: "investment",
        amount: 0,
        rate: 0,
        description: "",
    })

    var [loanForm, setLoanForm] = useState({
        period: gameControl.period,
        type: "loan",
        amount: 0,
        rate: 0,
        description: "",
        clearingPeriod: (gameControl.period + 1)
    })

    useEffect(() => {
        if (gameControl) if (gameControl.period) {setInvestmentForm({...investmentForm, period: gameControl.period}); 
        setLoanForm({...loanForm, period: gameControl.period, clearingPeriod: gameControl.period + 1})
        }
    }, [gameControl])

    const changeValue = (e) => {
        var value = parseInt(e.target.value)
        value = value || ""
        setForm({...form, [e.target.name]: value})
    }
    
    const changeInvestment = (e) => {
        if (e.target.name === "amount") var value = parseInt(e.target.value)
        else if (e.target.name === "description") var value = e.target.value
        else var value = parseFloat(e.target.value)
        value = value || ""
        setInvestmentForm({...investmentForm, [e.target.name]: value})
    }
    
    const changeLoan = (e) => {
        if (e.target.name === "amount") var value = parseInt(e.target.value)
        else if (e.target.name === "description") var value = e.target.value
        else var value = parseFloat(e.target.value)
        value = value || ""
        setLoanForm({...loanForm, [e.target.name]: value})
    }

    const integerControl = (e) => {
        if (e.target.value > 1000000 || e.target.value < 0) setErrors({...errors, integer: "Debe ser un valor entero menor que 1000000 y mayor que 0"})
        else if (e.target.name.slice(0,7) === "quality" && e.target.value % 1 !== 0) setErrors({...errors, integer: "Deben ser unidades enteras, no decimales"})
        // else if (e.target.name.slice(0,7) === "quality" && e.target.value < 0) setErrors({...errors, integer: "No pueden haber números negativos"})
        // else if (e.target.name.slice(0,8) === "quantity" && e.target.value % 5 !== 0) setErrors({...errors, integer: "Debe ser un multiplo de 5"})
        else setErrors({...errors, integer:"", general: ""})
    }

    const floatControl = (e) => {
        if (e.target.value < 0 || e.target.value >= 1) setErrors({...errors, dinform: "Debe ser un valor entre 0 y 1"})
        else setErrors({...errors, dinform:""})
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
    if ((form.finantialFixedInvestment + investmentForm.amount) > maxTotalFinInvestAmount && errors.general === "") {
        setErrors({...errors, general: `Monto máximo de inversión financiera superado (${maxTotalFinInvestAmount})`})
    }
    if ( (form.finantialFixedRentability / form.finantialFixedInvestment) > maxRateFinFixedInvest && errors.general === "") {
        setErrors({...errors, general: `La tasa de rentabilidad para inversiones fijas es superior a la permitida (${maxRateFinFixedInvest})`})
    }
    if ( loanForm.amount > maxLoanAmount && errors.dinform === "") {
        setErrors({...errors, dinform: `El monto del préstamo supera al permitido (${maxLoanAmount})`})
    }
    if ( loanForm.rate < minRateLoan && loanForm.amount > 0 && errors.dinform === "") {
        setErrors({...errors, dinform: `La tasa del préstamo no puede ser inferior a ${minRateLoan}`})
    }
    if ( investmentForm.rate > maxRateFinDinInvest && investmentForm.amount > 0 && errors.dinform === "") {
        setErrors({...errors, dinform: `La tasa de rentabilidad de la inversión dinámica no puede ser superior a ${maxRateFinDinInvest}`})
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
        if (form.quantityA > 0) stock.push({id: loginData.id, insert: {
            period: period,
            typeProduct: "A",
            stockProduct: form.quantityA,
            qualityProduct: form.qualityA,
            priceProduct: form.priceA
            }})
        if (form.quantityB > 0) stock.push({id: loginData.id, insert: {
            period: period,
            typeProduct: "B",
            stockProduct: form.quantityB,
            qualityProduct: form.qualityB,
            priceProduct: form.priceB
            }})
        if (form.quantityC > 0) stock.push({id: loginData.id, insert: {
            period: period,
            typeProduct: "C",
            stockProduct: form.quantityC,
            qualityProduct: form.qualityC,
            priceProduct: form.priceC
            }})
        dispatch(createActionForm(loginData.id, formul, loanForm, investmentForm)) 
    }

    var rateFinantialFixedInvestment = ((form.finantialFixedRentability / form.finantialFixedInvestment * 100).toFixed(2)) || 0
    var finalAmountDinamicFinantial = ((investmentForm.amount * (investmentForm.rate + 1)).toFixed(2)) || 0

    var totalAcc = ( form.quantityA * costProdA + 
        form.quantityB * costProdB + 
        form.quantityC * costProdC +
        ((form.qualityA + form.qualityB + form.qualityC ) * qualityInvCost) +
        form.finantialFixedInvestment + investmentForm.amount - loanForm.amount)
    
    const capitalGame = (parseInt(initialCapital) - (loans? netLoan : 0) + loanForm.amount) || 0
    console.log(netLoan)

    var disabled = true

    if (
        errors.general === "" &&
        errors.integer === "" &&
        errors.total === ""
        ) {disabled = false}

    return (
        <>
            <h4>
                Datos de la empresa
            </h4>
            <table>
                <thead>
                    <tr>
                        <th>
                            Concepto
                        </th>
                        <th>
                            Monto
                        </th>   
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Capital Inicial:
                        </td>
                        <td>
                            {initialCapital}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Pago de préstamos (i + k):
                        </td>
                        <td>
                            {loans? netLoan : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Préstamos a tomar:
                        </td>
                        <td>
                            {loanForm.amount}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Neto - en juego:
                        </td>
                        <td>
                            {capitalGame}
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4>
                Formulario - Plan de acción
            </h4>
        <table>
            <thead>
                <tr>
                    <th>
                        Parte de Producción
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
                </tbody>
                <thead>
                <tr>
                    <th>
                        Parte Financiera
                    </th>
                    <th>
                        Observación / Detalle
                    </th>
                    <th>
                        Monto
                    </th>
                    <th>
                        % Tasa
                    </th>
                    <th>
                        Total 
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>
                        Inversión Financiera Fija. 
                    </th>
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
                        <span>{rateFinantialFixedInvestment || 0} %</span>
                    </td>
                    <td>
                        <input name="finantialFixedRentability" value={form.finantialFixedRentability} type="number" onChange={(e) => {changeValue(e); integerControl(e)}}/>
                    </td>
                </tr>
                    <tr>
                        <th>
                            Inversión Financiera Variable. 
                        </th>
                    </tr>
                
                <tr>
                    <td>
                        Inversión Financiera Variable.
                    </td>
                    <td>
                        Inversión abierta. Indicar monto y tasa tentativa.
                    </td>
                    <td>
                        <input name="amount" value={investmentForm.amount} type="number" onChange={(e) => {changeInvestment(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <input name="rate" value={investmentForm.rate} type="number" onChange={(e) => {changeInvestment(e); floatControl(e)}}/>
                    </td>
                    <td>
                        <span> ${finalAmountDinamicFinantial}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Descripción
                    </td>
                    <td>
                        Indicar un link al cual recurrir para consultar la información de la posición.
                    </td>
                    <td>
                        <input name="description" value={investmentForm.description} type="text" onChange={(e) => {changeInvestment(e)}}/>
                    </td>
                </tr>

                    <tr>
                        <th>
                            Préstamo.
                        </th>
                        <th>
                            Observación / Detalle
                        </th>
                        <th>
                            Monto
                        </th>
                        <th>
                            % Tasa
                        </th>
                        <th>
                            Período de liquidación. 
                        </th>
                    </tr>
                
                <tr>
                    <td>
                        Préstamo.
                    </td>
                    <td>
                        Indicar monto a solicitar. Se sumará el monto al capital neto en juego. Indicar período de liquidación.  
                    </td>
                    <td>
                        <input name="amount" value={loanForm.amount} type="number" onChange={(e) => {changeLoan(e); integerControl(e)}}/>
                    </td>
                    <td>
                        <input name="rate" value={loanForm.rate} type="number" onChange={(e) => {changeLoan(e); floatControl(e)}}/>
                    </td>
                    <td>
                        <input name="clearingPeriod" value={loanForm.clearingPeriod} type="number" onChange={(e) => {changeLoan(e); integerControl(e)}}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        Descripción
                    </td>
                    <td>
                        Indicar un link al cual recurrir para consultar la información de la posición.
                    </td>
                    <td>
                        <input name="description" value={loanForm.description} type="text" onChange={(e) => {changeLoan(e)}}/>
                    </td>
                </tr>

                <tr>
                    <th>
                        {null}
                    </th>
                    <th>
                        Total acumulado
                    </th>
                    <th>
                        {totalAcc}
                    </th>
                </tr>

            </tbody>
        </table>
        <h4>
            Control
        </h4>
            <ul>
            <li>Control general: {(errors.general !== "") ? errors.general : "OK"}</li>
            <li>Control enteros: {(errors.integer !== "") ? errors.integer : "OK"}</li>
            <li>Control totales: {(errors.dinform !== "") ? errors.dinform : "OK"}</li>
            <li>Control totales: {(errors.total !== "") ? errors.total : "OK"}</li>
            </ul>
        <button type="submit" disabled={disabled} onClick={() => submitForm()}>Enviar</button>
        </>
    )
}