import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DAO from '../components/Logic/DAO';
import Sidebar from '../components/UI/Sidebar';
import TopBar from '../components/UI/TopBar';
import PreguntaSection from '../components/UI/PreguntaSection';
import '../components/Style/evaluaciones.css'
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from "react-router-dom";

const EvaluacionContenido = (props) => {
    let navigate = useNavigate();
    const [claveCartel, setClaveCartel] = useState(useParams().clave);
    const [tipoCartel, setTipoCartel] = useState(useParams().tipo);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [puntajes, setPuntajes] = useState([]);
    const [totalPuntaje, setTotalPuntaje] = useState(0);
    const { getWhereWhere, getById, updateItem } = DAO();

    useEffect(() => {
        let retrieve = async () => {
            let data = await getById("respuestas", "respuestas");
            setRespuestas(data.respuestasPosibles.contenido);
            data = await getWhereWhere("pregunta", "criterio", "==", "Contenido", "tipo", "==", tipoCartel);
            setPreguntas(data);
            let res = await getById("evaluacion", claveCartel);
            if (!res.error) {
                if (res.puntajesContenido) {
                    let puntajesFromDatabase = res.puntajesContenido;
                    puntajesFromDatabase = puntajesFromDatabase.map(v => Object.values(v)[0]);
                    setPuntajes(puntajesFromDatabase);
                    setTotalPuntaje(puntajesFromDatabase.reduce((a, b) => b < 0 ? a : a + b, 0));
                } else {
                    console.log("No existe en base de datos")
                    setPuntajes(Array(data.length).fill(-1));
                }
            } else {
                navigate("/");
            }
        }
        retrieve();
    }, []);

    const goToPertinencia = () => {
        if (puntajes.some(v => v < 0)) {
            alertify.alert("Atención", "Debe responder todas las preguntas para poder continuar");
        } else {
            alertify.confirm('Concurso de carteles', '¿Esta seguro que desea continuar?',
                function () {
                    navigate("/EvaluacionPertinencia/" + claveCartel + "/" + tipoCartel);
                    alertify.success('Ok')
                }
                , function () {
                    alertify.error('Cancel')
                });
        }
    };

    const setPuntajeSeleccionado = async (idx, puntaje) => {
        try {
            let puntajesCopy = puntajes.slice();
            puntajesCopy[idx] = puntaje;
            setPuntajes(puntajesCopy);
            setTotalPuntaje(puntajesCopy.reduce((a, b) => b < 0 ? a : a + b, 0));
            let dataToUpdate = {
                puntajesContenido: preguntas.map((v, i) => { return { [v.titulo]: puntajesCopy[i] } }),
                totalPuntajeContenido: puntajesCopy.reduce((a, b) => b < 0 ? a : a + b, 0)
            }
            await updateItem("evaluacion", claveCartel, dataToUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <Sidebar></Sidebar>
            <TopBar titulo="Criterios de Contenido"></TopBar>
            <div className="workSpace">
                {preguntas.map((pregunta, idx) => {
                    return (
                        <PreguntaSection key={idx} titulo={pregunta.titulo} pregunta={pregunta.rubrica} respuestas={respuestas}
                            idxPregunta={idx} setPuntajeSeleccionado={setPuntajeSeleccionado} puntajes={puntajes} />
                    )
                }
                )}
            </div>
            <div className="bottomPart">
                <p className="puntaje">{`Puntaje parcial por criterios de contenido: ${totalPuntaje}`}</p>
                <button className="botonSiguiente" onClick={() => goToPertinencia()}>Siguiente</button>
            </div>
        </>

    )
}

export default EvaluacionContenido