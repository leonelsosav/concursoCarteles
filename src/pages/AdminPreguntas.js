import React from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';

const AdminPreguntas = () => {

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.titulo,
        },
        {
            name: 'Rubrica',
            selector: row => row.rubrica,
        },
        {
            name: 'Criterio',
            selector: row => row.criterio,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
        }
    ];

    const data = [
        {
            id: 1,
            titulo: '1',
            rubrica: '2',
            criterio: '3',
            tipo: '4',
        },
        {
            id: 2,
            titulo: '5',
            rubrica: '6',
            criterio: '7',
            tipo: '8',
        }
    ]

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de preguntas"></TopBar>
            <div className="workSpace">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
};

export default AdminPreguntas;