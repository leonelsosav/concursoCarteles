import React, { useState, useEffect } from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';
import DAO from '../components/Logic/DAO'

const Evaluaciones = () => {
    const { getWhere, getAll } = DAO();
    const [evaluaciones, setEvaluaciones] = useState([]);

    useEffect(() => {
        let retrieve = async () => {
            let data = await getWhere("evaluacion", "evaluado", "==", true);
            let newArray = [];
            data.forEach((evaluacion,i) => {
                newArray.push({
                    id: i,
                    clave: evaluacion.clave,
                    titulo: "cartel.titulo",
                    autor: "cartel.autor",
                    juez: "juez.nombre" + " " + 2,
                    puntos: "60",
                    ptsForma: evaluacion.totalPuntosF,
                    ptsContenido: evaluacion.totalPuntosC,
                    ptsPertinencia: evaluacion.totalPuntosP,
                    calidadSupervision: "Suficiente",
                    link: "cartel.link",
                })
            })
            // for await (let evaluacion of data) {
            //     let cartel = await getWhere("cartel", "clave", "==", evaluacion.clave);
            //     if (!cartel.error) {
            //         let juez = await getWhere("juez", "id", "==", cartel.juez);
            //         i = i + 1;
            //         newArray.push({
            //             id: i,
            //             clave: evaluacion.clave,
            //             titulo: cartel.titulo,
            //             autor: cartel.autor,
            //             juez: juez.nombre + " " + juez.apellidos,
            //             puntos: "60",
            //             ptsForma: evaluacion.totalPuntosF,
            //             ptsContenido: evaluacion.totalPuntosC,
            //             ptsPertinencia: evaluacion.totalPuntosP,
            //             calidadSupervision: "Suficiente",
            //             link: cartel.link,
            //         })
            //     }
            // }
            // console.log()
            setEvaluaciones(newArray);
        }
        retrieve();
    }, []);

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

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Evaluaciones"></TopBar>
            <div className="workSpace">
                <DataTable
                    columns={columns}
                    data={evaluaciones}
                />
            </div>
        </>
    )
};

export default Evaluaciones;
