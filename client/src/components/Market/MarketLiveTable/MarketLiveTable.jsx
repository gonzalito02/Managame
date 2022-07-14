import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { GlobalFilter } from "../../GlobalFilter";
import { getMarketLive } from "../../../redux/actions/actions";

export default function MarketLiveTable () {

    const dispatch = useDispatch()
    const market = useSelector(state => state.marketLive)
    const gameControl = useSelector(state => state.gameControl)

    var [errors, setErrors] = useState({})
    var [marketForm, setMarketForm] = useState([])
    var [customer, setCustomer] = useState({})

    const [submit, setSubmit] = useState(true)

    console.log(gameControl.actionGame)
    
    if (market.length === 0) var marketLive = ["none"]  
    else var marketLive = market

    useEffect(() => {
        dispatch(getMarketLive())
    }, [dispatch, submit])

    const data = useMemo(() => marketLive, [market])
    const columns = useMemo(() => COLUMNS, [])

    const handlePurchase = (e, row) => {
        console.log(e.target.name)
        console.log(Object.keys(marketForm))
        setMarketForm([...marketForm, {[e.target.name]: {id: row.original.playerId, purchase: {
            period: gameControl.period,
            typeProduct: row.original.typeProduct,
            purchase: e.target.value
        }}}])
        console.log(marketForm)
    }

    // const handleDestroy = (e, row) => {
    //     dispatch(deleteActionForm({playerId: row.original.playerId, period: row.original.period}))
    //     setSubmit(!submit)
    // }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
            {
              id:"Compra",
              Header:"Compra",
              Cell: ({ row }) => ( 
                //(gameControl.actionGame === 1) && 
                <div>
                  <input name={
                    (row.original.typeProduct === "A")? `${row.original.playerId}1`: 
                    (row.original.typeProduct === "B")? `${row.original.playerId}2`:
                    `${row.original.playerId}3`} 
                  onChange={e => handlePurchase(e, row)}></input>
                </div>
              )
            },
            {
                id:"Validación",
                Header:"Validación",
                Cell: ({ row }) => ( 
                  //(gameControl.actionGame === 1) && 
                  <div>
                    <span>Errores</span>
                  </div>
                )
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
            //}, tableHooks, useGlobalFilter, usePagination)

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

        </>
    )

}