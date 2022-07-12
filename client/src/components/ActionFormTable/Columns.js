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
        Header: 'Values',
        accessor: row => { return row.priceA? `Price A : ${row.priceA}, Quantity A: ${row.quantityA}, Quality A: ${row.qualityA}`: null}
    },
    {
        Header: 'Fecha de creación',
        accessor: row => { return row.createdAt? row.createdAt.slice(0,10) : null}
    },
    {
        Header: 'Validado por Admin',
        accessor: row => { return row.validateByAdmin? "Aprobado": "Pendiente"}
    }, 
]