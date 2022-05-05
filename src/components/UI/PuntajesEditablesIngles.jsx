import React, { useState } from 'react'
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

const PuntajesEditablesIngles = ({ tipo, puntosMinimos, save, saveTipo, deleteTipo }) => {
    const [puntajesMin, setPuntajesMin] = useState(puntosMinimos);
    const [isEditable, setIsEditable] = useState(false);
    const [tipoPreg, setTipoPreg] = useState(tipo);
    const [isEditableTipo, setIsEditableTipo] = useState(false);

    const activateEditableMode = () => {
        setIsEditable(true);
    }

    return (
        <>
            {!isEditableTipo ?
                <p className="titulo">{`${tipoPreg}: `}
                    <FaEdit style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                        onClick={() => setIsEditableTipo(true)} />
                    <FaTrashAlt onClick={() => deleteTipo(tipoPreg)}style={{ color: "red", "fontSize": "1em" }} /></p>
                :
                <div>
                    <input type="text" name="Tipo pregunta" id="Tipo pregunta"
                        value={tipoPreg} onChange={(e) => setTipoPreg(e.target.value)} />
                    <FaSave style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                        onClick={() => { setIsEditable(false); saveTipo(tipoPreg, tipo, puntajesMin) }} />
                    <FcCancel onClick={() => { setIsEditableTipo(false); setTipoPreg(tipo) }} />
                </div>
            }


            {!isEditable ?
                <>
                    <p className="puntajeEditable">{puntosMinimos}
                        <FaEdit style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                            onClick={() => activateEditableMode()} /></p>
                </>
                :
                <div>
                    <input type="number" name="puntajeMinimo" id="puntajeMinimo"
                        value={puntajesMin} onChange={(e) => setPuntajesMin(e.target.value)} />
                    <FaSave style={{ color: "green", "fontSize": "1em", "marginLeft": "10px", "marginRight": "10px" }}
                        onClick={() => { setIsEditable(false); save(puntajesMin, tipoPreg) }} />
                    <FcCancel onClick={() => { setIsEditable(false); setPuntajesMin(puntosMinimos) }} />
                </div>}
        </>
    )
}

export default PuntajesEditablesIngles