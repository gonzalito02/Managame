export const COLUMNS = [
    {
        Header: 'PlayerID',
        accessor: 'playerId',
    }, 
    {
        Header: 'Periodo',
        accessor: 'period',
    }, 
    {
        Header: 'Fecha de creación',
        accessor: row => { return row.createdAt? row.createdAt.slice(0,10) : null}
    },
    {
        Header: 'Tipo',
        accessor: row => { return row.type? row.type : "action plan"}
    },
    {
        Header: 'Período de venc.',
        accessor: row => { return row.clearingPeriod? row.clearingPeriod : null}
    },
    {
        Header: 'Acciones',
        accessor: row => { return row.type === "investment"? "aca va un input" : null}
    },
    {
        Header: 'Validado por Admin',
        accessor: row => { return row.createdAt? (row.validateByAdmin === 1 ? "Passed"
                                                                            : row.validateByAdmin === 2 ? "Denegated" 
                                                                            : "Pending") : null
                        }
    }
]