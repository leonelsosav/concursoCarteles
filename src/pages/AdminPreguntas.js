import React, { useState, useEffect } from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';
import DAO from '../components/Logic/DAO'
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AdminPreguntas = () => {
    const { getAll } = DAO();
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        let retrieve = async () => {
            let data = await getAll("pregunta");
            data = data.map((pregunta, idx) => {
                return {
                    id: idx,
                    titulo: pregunta.titulo,
                    tipo: pregunta.tipo,
                    rubrica: pregunta.rubrica,
                    criterio: pregunta.criterio
                }
            })
            setPreguntas(data);
        }
        retrieve();
    }, []);

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.titulo,
            sortable: true,
            width: "250px"
        },
        {
            name: 'Rubrica',
            selector: row => row.rubrica,
            sortable: true,
            width: "350px"
        },
        {
            name: 'Criterio',
            selector: row => row.criterio,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            width: "250px"
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
        setPreguntas([{
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
            <TopBar titulo="Administración de preguntas"></TopBar>
            <div className="workSpace">
                <button className="btnAdd" onClick={() => changeData()}>Añadir registro</button>
                <DataTable
                    columns={columns}
                    data={preguntas}
                />
            </div>
        </>
    )
};

export default AdminPreguntas;