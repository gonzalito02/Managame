import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { decrementMarket, getMarketLive, handlePurchase, makeCart } from "../../../redux/actions/actions";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';
import { CSVLink } from "react-csv";

export default function MarketLiveTable () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)
    const gameControl = useSelector(state => state.gameControl)
    const studentData = useSelector(state => state.dataStudentId)
    const userLogin = useSelector(state => state.userLogin)
    const cart = useSelector(state => state.cart)
    const cartControl = useSelector(state => state.cartControl)

    var [errors, setErrors] = useState({validate: "", total: ""})

    const cartFill = () => {
        if (cart.length > 0) {
            var finalCart = {}
            for (let i = 0; i < cart.length; i++) {
                let obj = {
                    "id": studentData.id,
                    "purchase":{   
                                "period": gameControl.period,
                                "typeProduct": cart[i][2].typeProduct,
                                "stockProduct": cart[i][1],
                                "qualityProduct": cart[i][2].qualityProduct,
                                "priceProduct": cart[i][2].priceProduct,
                                "playerId": cart[i][2].playerId
                                }
                            }
                finalCart = {...finalCart, [i]:obj}
                
            }
        }

        return finalCart
    }

    const totalCart = () => {

        var total = 0
        if (cart.length > 0) {
            var total = cart.reduce((a, b) => a + (parseInt(b[1]) * parseInt(b[2].priceProduct)), 0)
        }

        if (total > studentData.wallet && errors.total === "") {
            setErrors({...errors, total: "Disponibilidades insuficientes"}) 
        } 
        else if (total < 0 && errors.total === "") {
            setErrors({...errors, total: "No puede existir compra negativa"})
        }
        else if (cartControl.length === 0 && total <= studentData.wallet && (errors.validate !== "" || errors.total !== "")) {
            setErrors({...errors, validate: "", total: ""})
        } 
        return total
    }
    
    // if (market.length === 0) var marketLive = ["none"]  
    // else var marketLive = market

    useEffect(() => {
        dispatch(getMarketLive())
        // cartFill()
    }, [])

    const data = useMemo(() => market, [market])
    const columns = useMemo(() => COLUMNS, [])

    const sendPurchase = () => {
        const finalCart = cartFill()
        const wallet = totalCart()
        var global = []

        for (let i = 0; i < cart.length; i++) {
            global.push(finalCart[i])
        }

        dispatch(handlePurchase(global, wallet))
        console.log("Purchase done")
    }

    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            pageOptions,
            gotoPage,
            pageCount,
            setPageSize,
            state,
            setGlobalFilter,
            prepareRow } = useTable({
                columns,
                data
            }, useGlobalFilter, usePagination)

    const { pageIndex, pageSize, globalFilter } = state 

    if (pageSize === 10) setPageSize(12)

    return (
        <>
        <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Market Live</h2>
        {(market.length === 0) ?
        <Container>
            <Alert variant={"warning"}>No market data yet</Alert>
        </Container>
        :
        <Container>
        
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
        <Table size="sm" {...getTableProps()}>
        
            <thead>
                {
                    headerGroups.map(hg =>                        
                    <tr {...hg.getHeaderGroupProps}>
                        {
                            hg.headers.map( column =>       
                                <th {...column.getHeaderProps}>{column.render("Header")}</th>
                            )
                        }
                    </tr>                    
                    )
                }
            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    page.map((row) => {
                        prepareRow(row);
                        return (
   
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( (cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }  
                            </tr>

                        )
                    })
                }

            </tbody>

        </Table>

        <div>
            <span>Page{"    "}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{"    "}</span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
            <CSVLink  data={market}><button>Download CSV</button></CSVLink>
        </div>
       

        {errors.validate !== ""? <span>{errors.validate}</span> : null}
        {errors.total !== ""? <span>{errors.total}</span> : null}

        <div>
            <h2 style={{padding:"20px", borderBottom:"solid 1px"}}>Orden de compra</h2>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Empresa
                        </th>
                        <th>
                            Producto
                        </th>
                        <th>
                            Cantidad
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {(cart.length > 0)? cart.map((m) => (
                        <tr>
                            <td>
                            {m[2].fantasyName ? m[2].fantasyName : m[2].officialName}
                            </td>
                            <td>
                            {m[2].typeProduct}
                            </td>
                            <td>
                            {m[1]}
                            </td>
                            <td>
                             $ {m[1] * m[2].priceProduct}
                            </td>
                        </tr>
                    )):
                    null}

                </tbody>
                <tfoot>
                    <tr>
                        <th>
                            Total
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                            $ {totalCart()}
                        </th>
                    </tr>
                </tfoot>
            </Table>

        </div>
        {gameControl.actionGame === 1?
        <Button disabled={(errors.validate !== "" || errors.total !== "")} onClick={() => sendPurchase()}>Comprar</Button>
        : null}
        </Container>
        }
     </>
    )

}