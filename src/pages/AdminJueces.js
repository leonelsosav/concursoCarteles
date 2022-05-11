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

const AdminJueces = () => {
    const { getAll, createItem, updateItem, deleteItem, getOrderByLimit, getWhere } = DAO();
    const [jueces, setJueces] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const estructura = useRef([
        { nombre: "Nombre", tipo: "text" },
        { nombre: "Apellidos", tipo: "text" },
    ]);
    const editId = useRef(-1);
    const [inputs, setInputs] = useState(Array(estructura.current.length).fill(""));
    const [inputsEdit, setInputsEdit] = useState(Array(estructura.current.length).fill(""));

    useEffect(() => {
        let retrieve = async () => {
            let data = await getWhere("juez", "rol", "==", "Juez");
            if (data.length > 0) {
                data = data.map((juez, idx) => {
                    return {
                        id: idx,
                        Id: juez.Id,
                        nombre: juez.nombre,
                        apellidos: juez.apellidos,
                    }
                })
                setJueces(data);
            }
            // for await (let juez of data) {
            //     await updateItem("juez", juez.Id, {
            //         password: "ConcursoMayab", isLoggedIn: false, rol: "Juez",
            //         user: juez.apellidos.trim().toUpperCase() + "_" + juez.nombre.trim().toUpperCase()
            //     });
            //     console.log(juez.Id);
            // }
        }
        retrieve();
    }, []);

    const columns = [
        {
            name: 'Id',
            selector: row => row.Id,
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
                    <FaEdit style={{ color: "green", "fontSize": "1.5em", "marginRight": "10px" }} onClick={() => openEditForm(row.id)} />
                    <FaTrashAlt style={{ color: "red", "fontSize": "1.5em" }} onClick={() => deleteJuez(row.id)} />
                </>
            )
        }
    ];

    const deleteJuez = async (id) => {
        console.log(id)
        alertify.confirm("Anahuac Mayab", "¿Estas seguro de eliminar este juez?", async () => {
            let res = await deleteItem("juez", jueces[id].Id);
            if (!res.error) {
                let dataa = jueces.filter((juez, idx) => idx !== id).map((juez, idx) => {
                    return {
                        id: idx,
                        Id: juez.Id,
                        nombre: juez.nombre,
                        apellidos: juez.apellidos,
                    }
                })
                setJueces(dataa);
                alertify.success("Juez eliminado");
            } else {
                alertify.error("Error al eliminar el juez");
            }
        }, () => { alertify.error('Cancel'); });
    }

    const openEditForm = (id) => {
        editId.current = id;
        setInputsEdit(Object.values(jueces[id]).slice(2));
        setShowFormEdit(true);
    }

    const editJuez = async (juezInfo) => {
        try {
            let juezLooked = jueces[editId.current];
            let newObj = {
                Id: juezLooked.Id,
                nombre: juezInfo.Nombre,
                apellidos: juezInfo.Apellidos,
            };
            let res = await updateItem("juez", newObj.Id, newObj);
            if (!res.error) {
                let idx = jueces.indexOf(juezLooked);
                setJueces(jueces.map((juez, i) => idx === i ? { id: juez.id, ...newObj } : juez));
                setShowFormEdit(false);
                alertify.alert('Anahuac Mayab', 'Juez editado!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo editar el juez, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    const createJuez = async (juezInfo) => {
        try {
            let newObj = {
                nombre: juezInfo.Nombre.trim().toUpperCase(),
                apellidos: juezInfo.Apellidos.trim().toUpperCase(),
                isLoggedIn: false,
                rol: "Juez",
                password: "ConcursoMayab",
                user: juezInfo.Apellidos.trim().toUpperCase() + "_" + juezInfo.Nombre.trim().toUpperCase(),
            };
            newObj.Id = await getOrderByLimit("juez", "Id", "desc", 1);
            newObj.Id = newObj.Id.Id + 1;
            let res = await createItem("juez", newObj, newObj.Id);
            if (!res.error) {
                setJueces([...jueces, { id: jueces.length, ...newObj }]);
                setShowForm(false);
                alertify.alert('Anahuac Mayab', 'Juez agregado!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo agregar el juez, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de jueces"></TopBar>
            <div className="workSpace">
                {!showFormEdit && <button className="btnAdd" onClick={() => !showForm ? setShowForm(true) : setShowForm(false)}>{showForm ? "Cerrar" : "Añadir juez"}</button>}
                {showForm && <Form txtBtn="Guardar Juez" estructura={estructura.current} guardarNuevoFn={createJuez} inputs={inputs} setInputs={setInputs}></Form>}
                {showFormEdit && <button className="btnAdd" onClick={() => setShowFormEdit(false)}>Cerrar</button>}
                {showFormEdit && <FormEdit txtBtn="Editar Juez" estructura={estructura.current} editarCartelFn={editJuez} inputsEdit={inputsEdit} setInputsEdit={setInputsEdit}></FormEdit>}
                <DataTable
                    columns={columns}
                    data={jueces}
                />
            </div>
        </>
    )
};

export default AdminJueces;