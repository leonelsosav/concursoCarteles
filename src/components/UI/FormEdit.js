import React, { useState } from 'react'
import '../Style/Form.css'
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const FormEdit = ({ estructura, txtBtn, editarCartelFn, inputsEdit, setInputsEdit }) => {
    

    const onSubmit = (e) => {
        e.preventDefault();
        estructura.forEach((val, idx) => {
            if(val.tipo === "read") inputsEdit[idx] = 0;
        });
        if (inputsEdit.includes("")) alertify.alert('Anahuac Mayab', 'No puede dejar ningun campo vacio!', () => { alertify.success('Ok'); });
        else if(inputsEdit.some(val => Number(val) < 0))alertify.alert('Anahuac Mayab', 'No puede incluir un numero negativo!', () => { alertify.success('Ok'); });
        else {
            let result = {};
            estructura.forEach((estr, index) => {
                result = { ...result, [estr.nombre]: inputsEdit[index] }
            });
            setInputsEdit(Array(estructura.length).fill(""));
            editarCartelFn(result);
        }
    }
    return (
        <form className="form" onSubmit={onSubmit}>
            {estructura.map((est, index) => {
                return (
                    <div key={index} className="form-control">
                        <label>{est.nombre}</label>
                        {est.tipo === "select" ? <select className="select" onChange={(e) => setInputsEdit(inputsEdit.map((value, idx) => idx === index ? e.target.value : value))}
                            value={inputsEdit[index]}>
                            <option value="" disabled hidden>Selecciona una opcion</option>
                            {est.options.map((val, idx) => {
                                return (
                                    <option key={idx} value={val}>{val}</option>
                                )
                            })}
                        </select>
                            :
                            est.tipo === "read" ? <h3 style={{ display: "inline-block" }}>{0}</h3>
                                :
                                <input type={est.tipo} placeholder={est.nombre} value={inputsEdit[index]}
                                    onChange={(e) => setInputsEdit(inputsEdit.map((value, idx) => idx === index ? e.target.value : value))} />}
                    </div>
                );
            })}
            <input type="submit" value={txtBtn} className="btnGuardar" />
        </form>
    )
}

export default FormEdit
