import React, {useEffect, useState} from 'react'
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import '../components/Style/nuevaEvaluacion.css'
import DAO from '../components/Logic/DAO' 

const NuevaEvaluacion = () => {
    const {getWhere } = DAO();
    const [carteles, setCarteles] = useState([]);

    useEffect(() => {
        let retrieve = async ()=>{
            let data = await getWhere("cartel", "juez", "==", "21");
            console.log(data);
            setCarteles(data);
        }
        retrieve(); 
    }, []);
    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Nueva evaluación"></TopBar>
            <div className="workSpace">
                <div className="carteles">
                    <p className="indicacionesNuevaEvaluacion">Seleccione el código de cartel a evaluar</p>
                    <select id="listaCarteles">
                        {carteles.length > 0 && carteles.map((cartel, idx) => {
                            return <option key={idx} value={cartel.Id}>{cartel.titulo}</option>
                        })}
                    </select>
                </div>
                <button id="botonSiguiente" className="botonSiguiente">Comenzar Evaluación</button>
            </div>

        </>
    )
}

export default NuevaEvaluacion
