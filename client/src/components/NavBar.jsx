import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavBar ({gameControl}) {

    var errors = useSelector(state => state.errors)

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

    return (
    <>
        <div>
            <h4>
                Ingresar
            </h4>
            <div>
            <Link to="/player">
            <button>Go to player</button>
            </Link>
            <Link to="/admin">
            <button>Admin Control</button>
            </Link>
            <Link to="/market">
            <button>Market</button>
            </Link>
            </div>
            <div>
                <span>Game Control</span>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Concepto
                            </th>
                            <th>
                                Valor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                period
                            </td>
                            <td>
                                {period}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                qualityInvCost
                            </td>
                            <td>
                                {qualityInvCost}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                productionCapacity
                            </td>
                            <td>
                                {productionCapacity}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            costProdA
                            </td>
                            <td>
                                {costProdA}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            costProdB
                            </td>
                            <td>
                                {costProdB}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            costProdC
                            </td>
                            <td>
                                {costProdC}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            minProductCapacity
                            </td>
                            <td>
                                {minProductCapacity}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            minRateLoan
                            </td>
                            <td>
                                {minRateLoan}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            maxLoanAmount
                            </td>
                            <td>
                                {maxLoanAmount}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            maxRateFinDinInvest
                            </td>
                            <td>
                                {maxRateFinDinInvest}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            maxRateFinFixedInvest
                            </td>
                            <td>
                                {maxRateFinFixedInvest}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            maxTotalFinInvestAmount
                            </td>
                            <td>
                                {maxTotalFinInvestAmount}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div>
                Acciones: <span>{errors}</span>
            </div>

        </div>
        </>
    )
}