import React, { useState } from 'react'
import '../Style/Form.css'
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const Form = ({ estructura, txtBtn, guardarNuevoFn, inputs, setInputs }) => {
    

    const onSubmit = (e) => {
        e.preventDefault();
        estructura.forEach((val, idx) => {
            if(val.tipo === "read") inputs[idx] = 0;
        });
        if (inputs.includes("")) alertify.alert('Anahuac Mayab', 'No puede dejar ningun campo vacio!', () => { alertify.success('Ok'); });
        else if(inputs.some(val => Number(val) < 0))alertify.alert('Anahuac Mayab', 'No puede incluir un numero negativo!', () => { alertify.success('Ok'); });
        else {
            let result = {};
            estructura.forEach((estr, index) => {
                result = { ...result, [estr.nombre]: inputs[index] }
            });
            setInputs(Array(estructura.length).fill(""));
            guardarNuevoFn(result);
        }
    }
    return (
        <form className="form" onSubmit={onSubmit}>
            {estructura.map((est, index) => {
                return (
                    <div key={index} className="form-control">
                        <label>{est.nombre}</label>
                        {est.tipo === "select" ? <select className="select" onChange={(e) => setInputs(inputs.map((value, idx) => idx === index ? e.target.value : value))}
                            value={inputs[index]}>
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
                                <input type={est.tipo} placeholder={est.nombre} value={inputs[index]}
                                    onChange={(e) => setInputs(inputs.map((value, idx) => idx === index ? e.target.value : value))} />}
                    </div>
                );
            })}
            <input type="submit" value={txtBtn} className="btnGuardar" />
        </form>
    )
}

export default Form
