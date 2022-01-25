import React from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';

const Evaluaciones = () => {

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
            name: 'Puntos',
            selector: row => row.puntos,
        },
        {
            name: 'Pts. de forma',
            selector: row => row.ptsForma,
        },
        {
            name: 'Pts. de contenido',
            selector: row => row.ptsContenido,
        },
        {
            name: 'Pts. de pertinencia',
            selector: row => row.ptsPertinencia,
        },
        {
            name: 'Calidad de supervisión',
            selector: row => row.calidadSupervision,
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
            puntos: '5',
            ptsForma: '6',
            ptsContenido: '7',
            ptsPertinencia: '8',
            calidadSupervision: '9',
            link: '10'
        },
        {
            id: 2,
            clave: '11',
            titulo: '12',
            autor: '13',
            juez: '14',
            puntos: '15',
            ptsForma: '16',
            ptsContenido: '17',
            ptsPertinencia: '18',
            calidadSupervision: '19',
            link: '20'
        }
    ]

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Evaluaciones"></TopBar>
            <div className="workSpace">
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </>
    )
};

export default Evaluaciones;