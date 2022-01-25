import React from 'react'
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import '../components/Style/nuevaEvaluacion.css'

const NuevaEvaluacion = () => {
    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Nueva evaluación"></TopBar>
            <div className="workSpace">
                <div className="jueces">
                    <p className="indicacionesNuevaEvaluacion">Seleccione su nombre en la lista desplegable</p>
                    <input list="listaJueces" name="jueces" id="jueces" />
                    <datalist id="listaJueces">
                    </datalist>
                </div>
                <div className="carteles">
                    <p className="indicacionesNuevaEvaluacion">Seleccione el código de cartel a evaluar</p>
                    <select id="listaCarteles">
                    </select>
                </div>
                <button id="botonSiguiente" className="botonSiguiente">Comenzar Evaluación</button>
            </div>

        </>
    )
}

export default NuevaEvaluacion
