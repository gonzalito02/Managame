import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllForms, getAllPlayers, getGameControl, getStudentById, loginFunction, logoutFunction, setUserLogged } from "../redux/actions/actions";
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

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
        <Navbar bg="light" expand="lg">
            
            <Container>
         

                <Navbar.Brand href="/home">Business Game</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="options">
                    <Nav className="allOptions">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                        {(loginUser.rol === "student" || loginUser.rol === "admin")?
                        <Nav>
                            <NavDropdown title="Student" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/market">
                                Market
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/student">
                                Student
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/studentResults">
                                Shopping
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            <Navbar.Text></Navbar.Text>
                            <div class="vr"></div> 
                              
                            <Navbar.Text>
                                Wallet $ {studentData.wallet}
                            </Navbar.Text>
                        </Nav>
                        : null}
                        {(loginUser.rol === "player" || loginUser.rol === "admin")?
                            <NavDropdown title="Player" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/player">
                                Player
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/playerResults">
                                Results
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/playerSales">
                                Sales
                                </NavDropdown.Item>
                            </NavDropdown>
                        : null}
                        {(loginUser.rol === "admin")?
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/adminControl">
                                Admin
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/adminPlayerAndStudents">
                                Players and Students
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/adminPlayersResults">
                                Players Results
                                </NavDropdown.Item>
                            </NavDropdown>
                        : null}

                        </Nav>

                            {loginUser.id?
                            
                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    <Navbar.Text>
                                    {`${loginUser.name} (${loginUser.rol})  `}             
                                    <div className="vr" />                                    
                                    </Navbar.Text>
                                    <Button variant="secondary" onClick={() => {submitLogout()}}>Logout</Button>  
                                </Nav>
                            </Navbar.Collapse>
                          
                            :
                            <Navbar.Collapse className="justify-content-end">
                                <NavDropdown title="Login"> 
                                        <Form className="d-flex">  
                                            <Form.Group>
                                                <Form.Control name="id" type="number" value={login.id} onChange={(e) => handleLogin(e)} />
                                                <NavDropdown.Divider />
                                                <input name="type" type="checkbox" value={login.aos} onChange={(e) => handleLogin(e)} /><span>Empresa </span>
                                                <NavDropdown.Divider />
                                                <Form.Control name="password" type="password" value={login.password} onChange={(e) => handleLogin(e)} />
                                                <NavDropdown.Divider />
                                                <Button variant="secondary" onClick={() => {submitLogin()}}>Login</Button>
                                            </Form.Group>
                                        </Form>
                                </NavDropdown>
                            </Navbar.Collapse>
                        }

                </Navbar.Collapse>
 
                </Container>
        </Navbar>
        
        <Table responsive size="sm" bordered>
                    
                    <tbody>
                        <tr>
                            <th>
                                period
                            </th>
                            <td>
                                {period}
                            </td>

                            <th>
                                qualityInvCost
                            </th>
                            <td>
                                {qualityInvCost}
                            </td>

                            <th>
                                productionCapacity
                            </th>
                            <td>
                                {productionCapacity}
                            </td>

                            <th>
                            costProdA
                            </th>
                            <td>
                                {costProdA}
                            </td>

                            <th>
                            costProdB
                            </th>
                            <td>
                                {costProdB}
                            </td>

                            <th>
                            costProdC
                            </th>
                            <td>
                                {costProdC}
                            </td>

                            <th>
                            actionGame
                            </th>
                            <td>
                                {(actionGame === 0)? "Production" : ((actionGame === 1)? "Market" : "Clearing")}
                            </td>
                        </tr>

                        <tr>
                            <th>
                            minProductCapacity
                            </th>
                            <td>
                                {minProductCapacity}
                            </td>

                            <th>
                            minRateLoan
                            </th>
                            <td>
                                {minRateLoan}
                            </td>

                            <th>
                            maxLoanAmount
                            </th>
                            <td>
                                {maxLoanAmount}
                            </td>

                            <th>
                            maxRateFinDinInvest
                            </th>
                            <td>
                                {maxRateFinDinInvest}
                            </td>

                            <th>
                            maxRateFinFixedInvest
                            </th>
                            <td>
                                {maxRateFinFixedInvest}
                            </td>

                            <th>
                            maxTotalFinInvestAmount
                            </th>
                            <td>
                                {maxTotalFinInvestAmount}
                            </td>
                            <th>
                            wallet
                            </th>
                            <td>
                                {wallet}
                            </td>
                        </tr>

                    </tbody>
            </Table>

            <Alert variant={"secondary"}>Acciones: {errors}</Alert>

        </>
    )
}