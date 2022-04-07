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

const AdminCarteles = () => {
    const { getAll, createItem, updateItem, deleteItem } = DAO();
    const [carteles, setCarteles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const estructura = useRef([
        { nombre: "Clave", tipo: "text" },
        { nombre: "Titulo", tipo: "text" },
        { nombre: "Autor", tipo: "text" },
        { nombre: "Juez", tipo: "number" },
        { nombre: "Nombre del juez", tipo: "text" },
        { nombre: "Tipo", tipo: "text" },
        { nombre: "Link", tipo: "text" }
    ]);
    const [inputs, setInputs] = useState(Array(estructura.current.length).fill(""));
    const [inputsEdit, setInputsEdit] = useState(Array(estructura.current.length).fill(""));

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
            minWidth: "1%",
            maxWidth: "4%"
        },
        {
            name: 'Titulo',
            selector: row => row.titulo,
            sortable: true,
            minWidth: "1%",
            maxWidth: "4%"
        },
        {
            name: 'Autor',
            selector: row => row.autor,
            sortable: true,
            minWidth: "1%",
            maxWidth: "6%"
        },
        {
            name: 'Juez',
            selector: row => row.juez,
            sortable: true,
            minWidth: "1%",
            maxWidth: "4%"
        },
        {
            name: 'Nombre del juez',
            selector: row => row.nombreJuez,
            sortable: true,
            minWidth: "1%",
            maxWidth: "5%"
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,
            minWidth: "1%",
            maxWidth: "5%"
        },
        {
            name: 'Link',
            selector: row => row.link,
            sortable: true,
            minWidth: "1%",
            maxWidth: "4%"
        },
        {
            minWidth: "1%",
            maxWidth: "3%",
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
            let res = await deleteItem("cartel", carteles[id].clave); 
            if (!res.error) {
                let dataa = carteles.filter((cartel, idx) => idx !== id).map((cartel, idx) => {
                    return {
                        id: idx,
                        clave: cartel.clave,
                        titulo: cartel.titulo,
                        autor: cartel.autor,
                        juez: cartel.juez,
                        nombreJuez: cartel.nombreJuez,
                        tipo: cartel.tipo,
                        link: cartel.link
                        }
                        })
                        setCarteles(dataa);
                        alertify.success("Cartel eliminado");
            } else {
                alertify.error("Error al eliminar cartel");
            }
        }, () => { alertify.error('Cancel'); });
    }

    const openEditForm = (id) => {
        console.log(id)
        setInputsEdit(Object.values(carteles[id]).slice(1));
        setShowFormEdit(true);
    }

    const editCartel = async (cartelInfo) => {
        try {
            let newObj = {
                clave: cartelInfo.Clave,
                titulo: cartelInfo.Titulo,
                autor: cartelInfo.Autor,
                juez: cartelInfo.Juez,
                nombreJuez: cartelInfo.Juez,
                tipo: cartelInfo.Tipo,
                link: cartelInfo.Link
            };
            let res = await updateItem("cartel", newObj.clave, newObj);
            if (!res.error) {
                let cartelLookedFor = carteles.find(cartel => cartel.clave === newObj.clave);
                let idx = carteles.indexOf(cartelLookedFor);
                setCarteles(carteles.map((cartel, i) => idx === i ? { id: cartel.id, ...newObj } : cartel));
                setShowFormEdit(false);
                alertify.alert('Anahuac Mayab', '¡Cartel editado!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo editar el cartel, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    const createCartel = async (cartelInfo) => {
        try {
            let newObj = {
                clave: cartelInfo.Clave,
                titulo: cartelInfo.Titulo,
                autor: cartelInfo.Autor,
                juez: cartelInfo.Juez,
                nombreJuez: cartelInfo.Juez,
                tipo: cartelInfo.Tipo,
                link: cartelInfo.Link
            };
            let res = await createItem("cartel", newObj, newObj.clave);
            if (!res.error) {
                setCarteles([...carteles, { id: carteles.length, ...newObj }]);
                setShowForm(false);
                alertify.alert('Anahuac Mayab', '¡Cartel agregado!', () => { alertify.success('Ok'); });
            } else alertify.alert('Anahuac Mayab', '¡No se pudo agregar el cartel, intentelo de nuevo!', () => { alertify.success('Ok'); });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <TopBar titulo="Administración de carteles"></TopBar>
            <div className="workSpace">
                {!showFormEdit && <button className="btnAdd" onClick={() => !showForm ? setShowForm(true) : setShowForm(false)}>{showForm ? "Cerrar" : "Añadir cartel"}</button>}
                {showForm && <Form txtBtn="Guardar Cartel" estructura={estructura.current} guardarNuevoFn={createCartel} inputs={inputs} setInputs={setInputs}></Form>}
                {showFormEdit && <button className="btnAdd" onClick={() => setShowFormEdit(false)}>Cerrar</button>}
                {showFormEdit && <FormEdit txtBtn="Editar Cartel" estructura={estructura.current} editarCartelFn={editCartel} inputsEdit={inputsEdit} setInputsEdit={setInputsEdit}></FormEdit>}
                <DataTable
                    columns={columns}
                    data={carteles}
                />
            </div>
        </>
    )
};

export default AdminCarteles;