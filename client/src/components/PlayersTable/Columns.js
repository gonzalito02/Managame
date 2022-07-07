export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
    }, 
    {
        Header: 'Empresa',
        accessor: 'officialName',
    }, 
    {
        Header: 'Nombre de Fantasía',
        accessor: 'fantasyName',
    },
    {
        Header: 'Grupo',
        accessor: 'group',
    },
    {
        Header: 'Miembros',
        //acccesor: "members"
        accessor: row => { return row.members }
    }
]