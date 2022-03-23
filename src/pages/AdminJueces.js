import React, { useState, useEffect} from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';
import DAO from '../components/Logic/DAO'
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AdminJueces = () => {
    const { getAll } = DAO();
    const [jueces, setJueces] = useState([]);

    useEffect(() => {
        let retrieve = async () => {
            let data = await getAll("juez");
            data = data.map((juez, idx) => {
                return {
                    id: idx,
                    identificador: juez.Id,
                    nombre: juez.nombre,
                    apellidos: juez.apellidos,
                }
            })
            setJueces(data);
        }
        retrieve();
    }, []);

    const columns = [
        {
            name: 'Id',
            selector: row => row.identificador,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        {
            name: 'Apellidos',
            selector: row => row.apellidos
        },
        {
            cell: row => (
                <>
                    <FaEdit style={{ color: "green", "fontSize": "1.5em","marginRight":"10px" }} onClick={() => deleteTransaction(row)} />
                    <FaTrashAlt style={{ color: "red", "fontSize": "1.5em" }} onClick={() => deleteTransaction(row)} />
                </>
            )
        }
    ];

    const changeData = (id) => {
        setJueces([{
            id: 1,
            titulo: "pregunta.titulo",
            tipo: "pregunta.tipo",
            rubrica: "pregunta.rubrica",
            criterio: "pregunta.criterio"
        }])
    }

    const deleteTransaction = (id) => {
        console.log(id)
    }
    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de jueces"></TopBar>
            <div className="workSpace">
            <button className="btnAdd" onClick={() => changeData()}>Añadir registro</button>
                <DataTable
                    columns={columns}
                    data={jueces}
                />
            </div>
        </>
    )
};

export default AdminJueces;