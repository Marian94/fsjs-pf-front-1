import React, { useState, useEffect } from "react";
import {Form, Alert} from 'react-bootstrap';
import {useFormik } from "formik";
import * as Yup from 'yup';
import {CustomButton} from '../Button/button';
import {Checkbox} from '../CheckBox/checkbox';
import axios from 'axios';

export const FormJob = () => {
    const formik = useFormik({
    initialValues: {
        serviceDelete: []
    },
    validationSchema: Yup.object({
        serviceDelete: Yup.string()
            .required('Elige un servicio a eliminar') 
    }),
    onSubmit: values => {
        const filterList =list.filter(x => values.serviceDelete.indexOf(x) === -1);
        setList(filterList);
        const ruta = encodeURI('/services');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"application/json"
            }
        };
        axios.post(ruta, filterList, reqconfig).then((res) => {
            console.log(res);    
        })
        .catch(err => {
            console.error(err);
        });
      },
    });
    useEffect(() => {
        const ruta = encodeURI("/services")
        axios.get("http://localhost:8000/services").then( res =>{
            console.log(res)

        }).catch(e =>{ console.error(e)})

    }, []);
    const initialList = [];
    const [service, setService] = useState('');
    const [list, setList] = useState(initialList);

    const handleChangeService = event => {
        setService(event.target.value);
    };
    const addList = event => {
        if (service) {
            setList(list.concat(service));
        }
        setService('');
        event.preventDefault();
    };
    const saveList = event => {
        const body={};
        if(list.length > 0){
            const ruta = encodeURI('/services');
            body.services = list;
            axios({
                url: ruta,
                baseURL: "http://localhost:8000",
                headers:{
                    "content-type":"application/json"
                },
                method: true ? "POST" : "PATCH",
                data: body
            }).then((res) => {
                console.log(res);    
            })
            .catch(err => {
                console.error(err);
            });
        }
    };
    return (
        <div className="grid-container">
            <div className="grid-item-header">
                <Form onSubmit={formik.handleSubmit} style={{textAlign:"left"}}>
                        <Form.Group>
                            <Form.Label>
                                Servicios <br/>
                                <input
                                    id="addService"
                                    type="text"
                                    className="form-control"
                                    placeholder="Agregar Servicio"
                                    onChange={handleChangeService}
                                    value={service}
                                />
                                <CustomButton onClickHandler={addList} variant="info"  label="Agregar Servicio" />
                            </Form.Label>
                                {list.map(item => (
                                    <Checkbox
                                        name="serviceDelete"
                                        key={item}
                                        label={item}
                                        value={item}
                                        onChange={formik.handleChange}
                                        checked={formik.values.serviceDelete.includes(item)}
                                    />
                                ))}
                            {formik.touched.serviceDelete && formik.errors.serviceDelete ? (
                            <Alert variant='danger'>
                                <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.serviceDelete}</p>
                            </Alert>
                            ) : null}
                        </Form.Group>
                    <CustomButton onClickHandler={saveList} variant="success" className="btn-lg" label="Guardar" />
                    <CustomButton type="submit" label="Eliminar" variant="danger" className="btn-lg"/>
                </Form>
            </div>
        </div>
    );
};