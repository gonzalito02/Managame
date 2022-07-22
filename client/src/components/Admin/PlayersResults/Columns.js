import AddExtraResult from "./AddExtraResult"

export const COLUMNS = [
    {
        Header: 'Player',
        accessor: 'playerId',
    }, 
    {
        Header: 'Periodo',
        accessor: 'period',
    }, 
    {
        Header: 'Inversión en Calidad',
        accessor: 'qualityInvestment',
    },
    {
        Header: 'Intereses por préstamos',
        accessor: 'loanInterest',
    },
    {
        Header: 'Resultados Financieros',
        accessor: 'finantialInvestmentResults',
    },
    {
        Header: 'Total ventas',
        accessor: 'totalSales',
    },
    {
        Header: 'Resultados extras',
        accessor: 'extraResults',
    },
    {
        Header: 'Total del período',
        accessor: 'totalPeriod',
    },
    {
        Header: 'Observaciones',
        accessor: 'observations',
    },
    {
        Header: 'Actions',
        accessor: row => { return <AddExtraResult data={row}/> }
    },
]