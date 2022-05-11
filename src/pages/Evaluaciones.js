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
            let data = await getWhere("cartel", "evaluado", "==", true);
            let newArray = data.length === 1 ? data : [];
            if (data.length > 1) {
                data.forEach((cartel, i) => {
                    newArray.push({
                        id: i,
                        clave: cartel.clave,
                        titulo: cartel.titulo,
                        autor: cartel.autor,
                        juez: cartel.juez,
                        puntos: cartel.totalPuntajeForma+cartel.totalPuntajeContenido+cartel.totalPuntajePertinencia,
                        ptsForma: cartel.totalPuntajeForma,
                        ptsContenido: cartel.totalPuntajeContenido,
                        ptsPertinencia: cartel.totalPuntajePertinencia,
                        calidadSupervision: "Suficiente",
                        link: cartel.link,
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
            }
            setEvaluaciones(!data.error && newArray);
        }
        retrieve();
    }, []);

    const columns = [
        {
            name: 'Clave',
            selector: row => row.clave,
            width: "100px"
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
            width: "250px"
        },
        {
            name: 'Autor',
            selector: row => row.autor,
            width: "200px"
        },
        {
            name: 'Juez',
            selector: row => row.juez,
            width: "70px"
        },
        {
            name: 'Puntos',
            selector: row => row.puntos,
            width: "70px"
        },
        {
            name: 'Pts. de forma',
            selector: row => row.ptsForma,
            width: "120px"
        },
        {
            name: 'Pts. de contenido',
            selector: row => row.ptsContenido,
            width: "120px"
        },
        {
            name: 'Pts. de pertinencia',
            selector: row => row.ptsPertinencia,
            width: "120px"
        },
        {
            name: 'Calidad de supervisión',
            selector: row => row.calidadSupervision,
            width: "120px"
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
