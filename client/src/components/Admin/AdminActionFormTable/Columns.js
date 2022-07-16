export const COLUMNS = [
    {
        Header: 'PlayerID',
        accessor: 'playerId',
    }, 
    {
        Header: 'Period',
        accessor: 'period',
    }, 
    {
        Header: 'Creation date',
        accessor: row => { return row.createdAt? row.createdAt.slice(0,10) : null}
    },
    {
        Header: 'Prices',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>A: {row.priceA}</li>
                <li>B: {row.priceB}</li>
                <li>C: {row.priceC}</li>
            </ul> : null}
    },
    {
        Header: 'Quantities',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>A: {row.quantityA}</li>
                <li>B: {row.quantityB}</li>
                <li>C: {row.quantityC}</li>
            </ul> : null}
    },
    {
        Header: 'Quality',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>A: {row.qualityA}</li>
                <li>B: {row.qualityB}</li>
                <li>C: {row.qualityC}</li>
                <li>Qinvest: {row.qualityInvestment}</li>
            </ul> : null}
    },
    {
        Header: 'FinantialFixedInvestment',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>finFixedInvestment: {row.finantialFixedInvestment}</li>
                <li>finFixedRentability: {row.finantialFixedRentability}</li>
            </ul> : null}
    },
    {
        Header: 'FinantialDinInvestment',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>Por ahora nada</li>
            </ul> : null}
    },
    {
        Header: 'Loans',
        accessor: row => { return row.createdAt? 
            <ul>
                <li>Por ahora nada</li>
            </ul> : null}
    },
    {
        Header: 'Validado por Admin',
        accessor: row => { return row.createdAt? (row.validateByAdmin === 1 ? "Passed"
                                                                            : row.validateByAdmin === 2 ? "Denegated" 
                                                                            : "Pending") : null
                        }
    }
]