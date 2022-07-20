import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { cartControlFunc, decrementMarket, getMarketLive, makeCart } from "../../../redux/actions/actions";

export default function MarketLiveTable () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)
    const gameControl = useSelector(state => state.gameControl)
    const studentData = useSelector(state => state.dataStudentId)
    const userLogin = useSelector(state => state.userLogin)
    const cart = useSelector(state => state.cart)
    const cartControl = useSelector(state => state.cartControl)

    var [errors, setErrors] = useState({validate: "existo", total: ""})

    const cartFill = () => {
        if (cart.length > 0) {
            var finalCart = {}
            for (let i = 0; i < cart.length; i++) {
                let obj = {
                    "id": cart[i][2].playerId,
                    "purchase":{   
                                "period": cart[i][2].period,
                                "typeProduct": cart[i][2].typeProduct,
                                "purchase": cart[i][1]
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
        else if (cartControl.length === 0 && errors.validate !== "" && total <= studentData.wallet) {
            setErrors({...errors, validate: "", total: ""})
        } 
        return total
    }
    
    if (market.length === 0) var marketLive = ["none"]  
    else var marketLive = market

    useEffect(() => {
        dispatch(getMarketLive())
        cartFill()
    }, [])

    const data = useMemo(() => marketLive, [market])
    const columns = useMemo(() => COLUMNS, [])
    
    const handlePurchase = (e, row) => {
        e.preventDefault()
        const data = row.original
        const prod = e.target.name
        var val = document.getElementById(e.target.name).value
        if (row.original.stockProduct < val) {
            setErrors({validate:"Error, no hay suficiente stock"})
            dispatch(cartControlFunc(prod, "add"))
        }
        else {
            dispatch(makeCart([prod, val, data]))
            dispatch(cartControlFunc(prod, "rm"))
        }
    }

    const sendPurchase = () => {
        const finalCart = cartFill()
        var purchaseCart = []
        for (let i = 0; i < cart.length; i++) {
            purchaseCart.push(finalCart[i])
        }
        dispatch(decrementMarket(purchaseCart))
        console.log("Purchase done")
    }
 
    const tableHooks = (hooks) => {

        hooks.visibleColumns.push((columns) => [
          ...columns,
            {
              id:"Compra",
              Header:"Compra",
              Cell: ({ row }) => {return (

                    <div>
                        <input name={
                            (row.original.typeProduct === "A")? `${row.original.playerId}1`: 
                            (row.original.typeProduct === "B")? `${row.original.playerId}2`:
                            `${row.original.playerId}3`} 
                        onChange={e => handlePurchase(e, row)} id={
                            (row.original.typeProduct === "A")? `${row.original.playerId}1`: 
                            (row.original.typeProduct === "B")? `${row.original.playerId}2`:
                            `${row.original.playerId}3`} 
                        ></input>
                    </div>

                )}
            }
          ]
        )
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
            } ,tableHooks, useGlobalFilter, usePagination)

    const { pageIndex, pageSize, globalFilter } = state 

    if (pageSize === 10) setPageSize(12)

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
        <table {...getTableProps()}>
        
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

        </table>

        <div>
            <span>Page{"    "}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{"    "}</span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>
        </div>

        {errors.validate !== ""? <span>{errors.validate}</span> : null}
        {errors.total !== ""? <span>{errors.total}</span> : null}

        <div>
            <h2>Orden de Compra</h2>
            <table>
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
            </table>

        </div>
        {gameControl.actionGame === 1?
        <button disabled={(errors.validate !== "" || errors.total !== "")} onClick={() => sendPurchase()}>Comprar</button>
        : null}
    </>
    )

}