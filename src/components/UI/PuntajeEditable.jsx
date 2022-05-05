import React, { useState } from 'react'
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";


const PuntajeEditable = ({ puntajesIniciales, savePuntajes, criterio, deletePuntaje }) => {
    const [puntajes, setPuntajes] = useState(puntajesIniciales);
    const [puntajeEditado, setPuntajeEditado] = useState(-1);

    const activateEditableMode = (idx) => {
        setPuntajeEditado(idx);
    }

    const cancelEditation = () =>{ 
        setPuntajeEditado(-1); 
        setPuntajes(puntajesIniciales);
    }

    return (
        <>
            {puntajes.map((puntaje, index) => {
                if (puntajeEditado !== index) {
                    return (
                        <div key={index}>
                            <p key={index + (puntajes.length * 2)} className='puntajeEditable'>{`${index} : ${puntaje}`} </p>
                            <FaEdit key={index + (puntajes.length * 3)} style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                                onClick={() => activateEditableMode(index)} />
                            <FaTrashAlt key={index + (puntajes.length * 4)} style={{ color: "red", "fontSize": "1em" }} onClick={()=>deletePuntaje(index, criterio)} />
                        </div>
                    )
                } else {
                    return (
                        <div key={index}>
                            <p key={index + (puntajes.length * 2)} className='puntajeEditable'>{`${index} : `}
                                <input type="text" name="descripcionPuntaje" id="descripcionPuntaje"
                                    value={puntajes[index]} onChange={(e) => setPuntajes(puntajes.map((v,i)=>i===index?e.target.value:v))} /> </p>
                            <FaSave key={index + (puntajes.length * 3)} style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                             onClick={() => {setPuntajeEditado(-1);savePuntajes(puntajes, criterio)}}/>
                            <FcCancel key={index + (puntajes.length * 4)} onClick={() => cancelEditation() } />
                        </div>
                    )
                }
            })
            }
        </>
    )
}

export default PuntajeEditable