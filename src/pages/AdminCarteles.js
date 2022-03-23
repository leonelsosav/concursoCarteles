import React, { useState, useEffect } from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';
import DAO from '../components/Logic/DAO'
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const AdminCarteles = () => {
    const { getAll } = DAO();
    const [carteles, setCarteles] = useState([]);

    useEffect(() => {
        let retrieve = async () => {
            let data = await getAll("cartel");
            data = data.map((cartel, idx) => {
                return {
                    id: idx,
                    clave: cartel.clave,
                    titulo: cartel.titulo,
                    autor: cartel.autor,
                    juez: cartel.juez,
                    nombreJuez: cartel.juez,
                    tipo: cartel.tipo,
                    link: cartel.link
                }
            })
            setCarteles(data);
        }
        retrieve();
    }, []);

    const columns = [
        {
            name: 'Clave',
            selector: row => row.clave,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Autor',
            selector: row => row.autor,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Juez',
            selector: row => row.juez,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Nombre del juez',
            selector: row => row.nombreJuez,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Link',
            selector: row => row.link,
            sortable: true,
            width: "150px"
        },
        {
            cell: row => (
                <>
                    <FaEdit style={{ color: "green", "fontSize": "1.5em", "marginRight": "10px" }} onClick={() => deleteTransaction(row)} />
                    <FaTrashAlt style={{ color: "red", "fontSize": "1.5em" }} onClick={() => deleteTransaction(row)} />
                </>
            )
        }
    ];

    const changeData = (id) => {
        setCarteles([{
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
            <TopBar titulo="Administración de carteles"></TopBar>
            <div className="workSpace">
                <button className="btnAdd" onClick={() => changeData()}>Añadir registro</button>
                <DataTable
                    columns={columns}
                    data={carteles}
                />
            </div>
        </>
    )
};

export default AdminCarteles;