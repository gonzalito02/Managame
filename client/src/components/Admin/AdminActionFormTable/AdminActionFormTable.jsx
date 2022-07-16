import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table"
import { COLUMNS } from "./Columns";
import { useSelector, useDispatch } from 'react-redux';
import { deleteActionForm, getAllForms, getPenddingActionForms, validateActionForm } from "../../../redux/actions/actions";
import { GlobalFilter } from "../../GlobalFilter";

export default function AdminActionFormTable () {

    const dispatch = useDispatch()
    const forms = useSelector(state => state.penddingActionForm)
    const [submit, setSubmit] = useState(true)
    
    if (forms.length === 0) var formul = ["none"]  
    else var formul = forms

    useEffect(() => {
        dispatch(getPenddingActionForms())
    }, [dispatch, submit])

    const data = useMemo(() => formul, [forms])
    const columns = useMemo(() => COLUMNS, [])

    const handlePass = (e, row) => {
        dispatch(validateActionForm({playerId: row.original.playerId, period: row.original.period, type: 1}))
    }

    const handleDenegate = (e, row) => {
        dispatch(validateActionForm({playerId: row.original.playerId, period: row.original.period, type: 2}))
    }

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
            {
              id:"Actions",
              Header:"Actions",
              Cell: ({ row }) => ( 
                (row.original.createdAt && !row.original.validateByAdmin) && <div>
                  <button onClick={e => handlePass(e, row)}>Validate</button>
                  <button onClick={e => handleDenegate(e, row)}>Denegate</button>
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
            }, tableHooks, useGlobalFilter, usePagination)


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