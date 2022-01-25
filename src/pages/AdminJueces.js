import React from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';

const AdminJueces = () => {
    const columns = [
        {
            name: 'Id',
            selector: row => row.identificador,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos
        }
    ];

    const data = [
        {
            id: 1,
            identificador: '1',
            nombre: '2',
            apellidos: '3'
        },
        {
            id: 2,
            identificador: '4',
            nombre: '5',
            apellidos: '6'
        }
    ]

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de jueces"></TopBar>
            <div className="workSpace">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
};

export default AdminJueces;