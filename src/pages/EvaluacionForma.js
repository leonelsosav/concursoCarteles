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

const EvaluacionForma = (props) => {
    let navigate = useNavigate();
    const [claveCartel, setClaveCartel] = useState(useParams().clave);
    const [tipoCartel, setTipoCartel] = useState(useParams().tipo);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const [puntajes, setPuntajes] = useState([]);
    const [totalPuntaje, setTotalPuntaje] = useState(0);
    const { getWhereWhere, getById, createItem, updateItem } = DAO();

    useEffect(() => {
        let retrieve = async () => {
            let data = await getById("respuestas", "respuestas");
            setRespuestas(data.respuestasPosibles.forma);
            data = await getWhereWhere("pregunta", "criterio", "==", "Forma", "tipo", "==", tipoCartel);
            setPreguntas(data);
            let res = await getById("evaluacion", claveCartel);
            if (!res.error) {
                let puntajesFromDatabase = res.puntajesForma;
                puntajesFromDatabase = puntajesFromDatabase.map(v => Object.values(v)[0]);
                setPuntajes(puntajesFromDatabase);
                setTotalPuntaje(puntajesFromDatabase.reduce((a, b) => b < 0 ? a : a + b, 0));
            } else {
                console.log("No existe en base de datos")
                setPuntajes(Array(data.length).fill(-1));
            }
        }
        retrieve();
    }, []);

    const goToContenido = () => {
        if (puntajes.some(v => v < 0)) {
            alertify.alert("Atención", "Debe responder todas las preguntas para poder continuar");
        } else {
            alertify.confirm('Concurso de carteles', '¿Esta seguro que desea continuar?',
                function () {
                    navigate("/EvaluacionContenido/" + claveCartel + "/" + tipoCartel);
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
            console.log(puntajes);
            puntajesCopy[idx] = puntaje;
            setPuntajes(puntajesCopy);
            console.log(puntajesCopy);
            setTotalPuntaje(puntajesCopy.reduce((a, b) => b < 0 ? a : a + b, 0));
            let res = await getById("evaluacion", claveCartel);
            if (!res.error) {
                let dataToUpdate = {
                    puntajesForma: preguntas.map((v, i) => { return { [v.titulo]: puntajesCopy[i] } }),
                    totalPuntajeForma: puntajesCopy.reduce((a, b) => b < 0 ? a : a + b, 0)
                }
                await updateItem("evaluacion", claveCartel, dataToUpdate);
            } else {
                let dataToSave = {
                    clave: claveCartel,
                    evaluado: false,
                    puntajesForma: preguntas.map((v, i) => { return { [v.titulo]: puntajesCopy[i] } }),
                    totalPuntajeForma: puntajesCopy.reduce((a, b) => b < 0 ? a : a + b, 0)
                }
                await createItem("evaluacion", dataToSave, claveCartel);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Criterios de forma"></TopBar>
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
                <p className="puntaje">{`Puntaje parcial por criterios de forma: ${totalPuntaje}`}</p>
                <button className="botonSiguiente" onClick={() => goToContenido()}>Siguiente</button>
            </div>
        </>

    )
}

export default EvaluacionForma