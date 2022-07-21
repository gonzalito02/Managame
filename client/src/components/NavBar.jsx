import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllForms, getAllPlayers, getGameControl, getStudentById, loginFunction, logoutFunction, setUserLogged } from "../redux/actions/actions";

export default function NavBar () {

    const dispatch = useDispatch()
    var errors = useSelector(state => state.errors)
    var loginUser = useSelector(state => state.userLogin)
    var studentData = useSelector(state => state.dataStudentId)
    const gameControl = useSelector(state => state.gameControl)

    const [login, setLogin] = useState({
        id: "",
        password: "",
        type: false
    })

    useEffect(() => {
        dispatch(getGameControl())
        dispatch(getAllPlayers())
        if(loginUser.rol === "student") dispatch(getStudentById(loginUser.id))
    }, [loginUser])

    useEffect(() => {
        const loggedUser = localStorage.getItem("loggedUser")
        if (loggedUser) {
            let rec = JSON.parse(loggedUser);
            dispatch(setUserLogged(rec))
        }
    }, [])

    const handleLogin = (e) => {
        if (e.target.name === "type") setLogin({...login, type: e.target.checked})
        else (setLogin({...login, [e.target.name]: e.target.value}))
    }

    const submitLogin = () => {
        dispatch(loginFunction(login))
        setLogin({
            id: "",
            password: "",
            type: false
        })
    }

    const submitLogout = () => {
        dispatch(logoutFunction())
    }

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
        maxTotalFinInvestAmount,
        actionGame,
        wallet
    } = gameControl

    return (
    <>
        <div>
            <h1>Welcome to Managame!</h1>

            {loginUser.id?
                <div>
                    <h3>{`Login ${loginUser.name}, role ${loginUser.rol}`}</h3>
                    <button onClick={() => {submitLogout()}}>Logout</button>
                </div>
            :
                <div>
                    <input name="id" type="number" value={login.id} onChange={(e) => handleLogin(e)}></input>
                    <input name="password" type="password" value={login.password} onChange={(e) => handleLogin(e)}></input>
                    <input name="type" type="checkbox" value={login.aos} onChange={(e) => handleLogin(e)}></input><span>Empresa </span>
                    <button onClick={() => {submitLogin()}}>Login</button>
                </div>
            }
            
            <div>
                    <Link to="/home">
                    <button>Home</button>
                    </Link>
                {(loginUser.rol === "student" || loginUser.rol === "admin")?
                    <Link to="/market">
                    <button>Market</button>
                    </Link>
                : null}
                {(loginUser.rol === "player" || loginUser.rol === "admin")?
                    <div>
                        <Link to="/player">
                        <button>Player</button>
                        </Link>
                        <Link to="/playerResults">
                        <button>Results</button>
                        </Link>
                    </div>
                : null}
                {(loginUser.rol === "admin")?
                    <div>
                        <Link to="/adminControl">
                        <button>Admin</button>
                        </Link>
                        <Link to="/adminPlayerAndStudents">
                        <button>Players and Students</button>
                        </Link>
                    </div>
                : null}
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Controladores del juego
                            </th>
                            <th>
                                
                            </th>
                            <th>
                                
                            </th>
                            <th>
                                
                            </th>
                            <th>
                                
                            </th>
                            <th>
                                
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

                            <td>
                                qualityInvCost
                            </td>
                            <td>
                                {qualityInvCost}
                            </td>

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

                            <td>
                            costProdB
                            </td>
                            <td>
                                {costProdB}
                            </td>

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

                            <td>
                            minRateLoan
                            </td>
                            <td>
                                {minRateLoan}
                            </td>

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

                            <td>
                            maxRateFinFixedInvest
                            </td>
                            <td>
                                {maxRateFinFixedInvest}
                            </td>

                            <td>
                            maxTotalFinInvestAmount
                            </td>
                            <td>
                                {maxTotalFinInvestAmount}
                            </td>
                        </tr>

                        <tr>
                            <td>
                            actionGame
                            </td>
                            <td>
                                {(actionGame === 0)? "Production" : ((actionGame === 1)? "Market" : "Clearing")}
                            </td>
                            <td>
                            wallet
                            </td>
                            <td>
                                {wallet}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            {(loginUser.rol === "student")? 
            <div>
                <h3>Wallet</h3>
                <h3>$ {studentData.wallet}</h3>
            </div> :
            null }

            <div>
                Acciones: <span>{errors}</span>
            </div>

        </div>
        </>
    )
}