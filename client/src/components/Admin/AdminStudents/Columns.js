import DeleteStudent from "./DeleteStudent"

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
    }, 
    {
        Header: 'Name',
        accessor: 'name',
    }, 
    {
        Header: 'Email',
        accessor: 'email',
    }, 
    {
        Header: 'Wallet',
        accessor: 'wallet',
    },
    {
        Header: 'Role',
        accessor: 'rolName',
    },
    {
        Header: 'Actions',
        accessor: row => { return <DeleteStudent data={row}/> }
    },
]