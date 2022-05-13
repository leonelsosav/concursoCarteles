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
                        puntos: cartel.totalPuntajeForma + cartel.totalPuntajeContenido + cartel.totalPuntajePertinencia,
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

    const exportarInfo = () => {
        //let loaderAnim = document.getElementById("loaderAnim");
        //let porcentajeLoader = document.getElementById("porcentajeLoader");
        //let i = 1;
        //loaderAnim.style.display = "block";

        const titulos = ["Nombre del Evaluador", "Clave QR", "Nombre del Cartel", "Seleccionar Rubrica"];

        let csvContent = "";

        csvContent += titulos.join("|") + "|";
        let preguntas = await getAll("pregunta");
        let preguntasUnicas = Array.from(new Set(preguntas.map(val => val.titulo)));
        preguntasUnicas = preguntasUnicas.filter(val => val !== "GRAMATICA" && val !== "CARTEL EN INGLÉS")
        csvContent += preguntasUnicas.join("|") + "|" + "Puntos en ingles" + "|" + "Puntos de Contenido" + "|" + "Puntos de Forma" + "|" + "Puntos de Pertinencia" + "|" + "TOTAL";
        csvContent += "\r\n";

        let evaluacionesFinalizadas = await getWhere("cartel", "evaluado", "==", true);
        for await (let evaluacion of evaluacionesFinalizadas) {
            //porcentajeLoader.innerText = (i * 100 / evaluacionesFinalizadas.length).toFixed(2) + "%";
            let cartel = await driver.read("cartel", evaluacion.clave);
            let juez = await driver.read("juez", cartel.juez);
            csvContent += juez.nombre + " " + juez.apellidos + "|";
            csvContent += cartel.id + "|";
            csvContent += cartel.titulo + "|";
            csvContent += cartel.tipo + "|";
            csvContent += preguntasUnicas.map(val => {
                if (evaluacion.titulosF.includes(val)) {
                    return evaluacion.puntosF[evaluacion.titulosF.indexOf(val)].toString();
                }
                else if (evaluacion.titulosC.includes(val)) {
                    return evaluacion.puntosC[evaluacion.titulosC.indexOf(val)].toString();
                }
                else if (evaluacion.titulosP.includes(val)) {
                    return evaluacion.puntosP[evaluacion.titulosP.indexOf(val)].toString();
                }
                else return ""
            }).join("|");
            let ingles = puntosInglesCarteles.find(elem => elem.cartel == evaluacion.clave).puntosIngles;
            csvContent += "|" + ingles;
            csvContent += "|" + (evaluacion.totalPuntosC).toString();
            csvContent += "|" + (evaluacion.totalPuntosF).toString();
            csvContent += "|" + (evaluacion.totalPuntosP).toString();
            csvContent += "|" + (evaluacion.totalPuntosC + evaluacion.totalPuntosF + evaluacion.totalPuntosP + ingles).toString();
            csvContent += "\r\n";
            i++;
        }
        //loaderAnim.style.display = "none";
        var universalBOM = "\uFEFF";
        var link = document.createElement("a");
        link.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM + csvContent));
        link.setAttribute("download", "evaluaciones.csv");
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Evaluaciones"></TopBar>
            <div className="workSpace">
                <button className='btnExportar' onClick={() => exportarInfo()}>Exportar evaluaciones</button>
                <DataTable
                    columns={columns}
                    data={evaluaciones}
                />
            </div>
        </>
    )
};

export default Evaluaciones;
