import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/UI/Sidebar'
import TopBar from '../components/UI/TopBar'
import DataTable from 'react-data-table-component';
import DAO from '../components/Logic/DAO'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Form from '../components/UI/Form'
import FormEdit from '../components/UI/FormEdit';
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const AdminPreguntas = () => {
    const { getAll, createItem, updateItem, deleteItem, getOrderByLimit } = DAO();
    const [preguntas, setPreguntas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const estructura = useRef([
        { nombre: "Titulo", tipo: "text" },
        { nombre: "Tipo", tipo: "text" },
        { nombre: "Rubrica", tipo: "text" },
        { nombre: "Criterio", tipo: "text" }
    ]);
    const editId = useRef(-1);
    const [inputs, setInputs] = useState(Array(estructura.current.length).fill(""));
    const [inputsEdit, setInputsEdit] = useState(Array(estructura.current.length).fill(""));

    useEffect(() => {
        let retrieve = async () => {
            console.log(inputs)
            let data = await getAll("pregunta");
            data = data.map((pregunta, idx) => {
                return {
                    id: idx,
                    Id: pregunta.Id,
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
                    <FaEdit style={{ color: "green", "fontSize": "1.5em", "marginRight": "10px" }} onClick={() => openEditForm(row.id)} />
                    <FaTrashAlt style={{ color: "red", "fontSize": "1.5em" }} onClick={() => deleteCartel(row.id)} />
                </>
            )
        }
    ];

    const deleteCartel = async (id) => {
        console.log(id)
        alertify.confirm("Anahuac Mayab", "¿Estas seguro de eliminar este cartel?", async () => {
            let res = await deleteItem("pregunta", preguntas[id].Id);
            if (!res.error) {
                let dataa = preguntas.filter((pregunta, idx) => idx !== id).map((pregunta, idx) => {
                    return {
                        id: idx,
                        Id: pregunta.clave,
                        titulo: pregunta.titulo,
                        tipo: pregunta.tipo,
                        rubrica: pregunta.rubrica,
                        criterio: pregunta.criterio
                    }
                })
                setPreguntas(dataa);
                alertify.success("Pregunta eliminada");
            } else {
                alertify.error("Error al eliminar la pregunta");
            }
        }, () => { alertify.error('Cancel'); });
    }

    const openEditForm = (id) => {
        editId.current = id;
        setInputsEdit(Object.values(preguntas[id]).slice(2));
        setShowFormEdit(true);
    }

    const editPregunta = async (preguntaInfo) => {
        try {
            let preguntaLooked = preguntas[editId.current];
            let newObj = {
                Id: preguntaLooked.Id,
                titulo: preguntaInfo.Titulo,
                tipo: preguntaInfo.Tipo,
                rubrica: preguntaInfo.Rubrica,
                criterio: preguntaInfo.Criterio,
            };
            let res = await updateItem("pregunta", newObj.Id, newObj);
            if (!res.error) {
                let idx = preguntas.indexOf(preguntaLooked);
                setPreguntas(preguntas.map((pregunta, i) => idx === i ? { id: pregunta.id, ...newObj } : pregunta));
                setShowFormEdit(false);
                alertify.alert('Anahuac Mayab', 'Pregunta editada!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo editar la pregunta, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    const createPregunta = async (preguntaInfo) => {
        try {
            let newObj = {
                titulo: preguntaInfo.Titulo,
                tipo: preguntaInfo.Tipo,
                rubrica: preguntaInfo.Rubrica,
                criterio: preguntaInfo.Criterio,
            };
            newObj.Id = await getOrderByLimit("pregunta", "Id", "desc", 1);
            newObj.Id = newObj.Id.Id + 1;
            console.log("DESDE CREATE PREGUNTA: ", newObj, newObj.Id);
            //buscar el Id mas alto
            let res = await createItem("pregunta", newObj, newObj.Id);
            console.log(res);
            if (!res.error) {
                setPreguntas([...preguntas, { id: preguntas.length, ...newObj }]);
                setShowForm(false);
                alertify.alert('Anahuac Mayab', 'Pregunta agregada!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo agregar la pregunta, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de preguntas"></TopBar>
            <div className="workSpace">
                {!showFormEdit && <button className="btnAdd" onClick={() => !showForm ? setShowForm(true) : setShowForm(false)}>{showForm ? "Cerrar" : "Añadir pregunta"}</button>}
                {showForm && <Form txtBtn="Guardar Pregunta" estructura={estructura.current} guardarNuevoFn={createPregunta} inputs={inputs} setInputs={setInputs}></Form>}
                {showFormEdit && <button className="btnAdd" onClick={() => setShowFormEdit(false)}>Cerrar</button>}
                {showFormEdit && <FormEdit txtBtn="Editar Pregunta" estructura={estructura.current} editarCartelFn={editPregunta} inputsEdit={inputsEdit} setInputsEdit={setInputsEdit}></FormEdit>}
                <DataTable
                    columns={columns}
                    data={preguntas}
                />
            </div>
        </>
    )
};

export default AdminPreguntas;