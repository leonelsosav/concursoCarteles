import React, { useState, useEffect, useRef } from 'react'
import '../Style/preguntaSection.css'

const PreguntaSection = ({ titulo, pregunta, respuestas, idxPregunta, setPuntajeSeleccionado, puntajes }) => {
    const [seleccionado, setSeleccionado] = useState([]);
    const firstFlag = useRef(false);

    useEffect(() => {
        if (puntajes.length > 0) {
            puntajes[idxPregunta] === -1 ? setSeleccionado(Array(respuestas.length).fill(false))
                : setSeleccionado(Array(respuestas.length).fill(false).map((v,i)=>i===puntajes[idxPregunta]?true:false));
            firstFlag.current = true;
        }
    }, [puntajes])

    const seleccionar = (idx) => {
        setPuntajeSeleccionado(idxPregunta, idx);
        setSeleccionado(seleccionado.map((val, idx2) => idx === idx2 ? true : false));
    }

    return (
        <>
            <div className="preguntaSection">
                <p className="titulo">{titulo}</p>
                <p className="pregunta">{pregunta}</p>
                <div className="respuestas">
                    {respuestas.map((respuesta, idx) => {
                        return (
                            <button key={idx} className={`${seleccionado[idx] === true && "seleccionado"} respuesta`}
                                onClick={() => seleccionar(idx)}>{`${idx} - ${respuesta}`}</button>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default PreguntaSection