import React from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';

const AdminCarteles = () => {

    const columns = [
        {
            name: 'Clave',
            selector: row => row.clave,
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
        },
        {
            name: 'Autor',
            selector: row => row.autor,
        },
        {
            name: 'Juez',
            selector: row => row.juez,
        },
        {
            name: 'Nombre del juez',
            selector: row => row.nombreJuez,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
        },
        {
            name: 'Link',
            selector: row => row.link,
        },
    ];

    const data = [
        {
            id: 1,
            clave: '1',
            titulo: '2',
            autor: '3',
            juez: '4',
            nombreJuez: '5',
            tipo: '6',
            link: '7'
        },
        {
            id: 2,
            clave: '8',
            titulo: '9',
            autor: '10',
            juez: '11',
            nombreJuez: '12',
            tipo: '13',
            link: '14'
        }
    ]

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de carteles"></TopBar>
            <div className="workSpace">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
};

export default AdminCarteles;