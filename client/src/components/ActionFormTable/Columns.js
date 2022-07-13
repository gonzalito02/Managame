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
        Header: 'Validado por Admin',
        accessor: row => { return row.createdAt? (row.validateByAdmin? "Aprobado": "Pendiente") : null}
    }, 
]