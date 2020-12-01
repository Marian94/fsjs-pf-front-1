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
            .required('Choose a service to delete') 
    }),
    onSubmit: values => {
        const filterList =list.filter(x => values.serviceDelete.indexOf(x) === -1);
        const ruta = encodeURI('/services');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"application/json"
            }
        };
        axios.patch(ruta, filterList, reqconfig).then((res) => {
            alert("Elementos Eliminados!")
            setList(res.data.result.updated.services);
            console.log(res.data.result)
            
            
        }).catch(err => {
            console.log("CATCH = ", err.response);

        });
      },
    });
    useEffect(() => {
        axios.get("http://localhost:8000/services").then( res =>{
            setList(res.data.result)
        }).catch(e =>{ console.error(e)})

    }, []);
    const [service, setService] = useState('');
    const [list, setList] = useState([]);

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
        const ruta = encodeURI('/services');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"application/json"
            }
        };
        axios.patch(ruta, list, reqconfig).then((res) => {
            alert("Lista actualizada!")
            setList(res.data.result.updated.services);
            console.log(res.data.result);
            
        }).catch(err => {
            console.log("CATCH = ", err.response);

        });
    };
    return (
        <div className="grid-container">
            <div className="grid-item-header">
                <Form onSubmit={formik.handleSubmit} style={{textAlign:"left"}}>
                        <Form.Group>
                            <Form.Label>
                                Jobs <br/>
                                <input
                                    id="addService"
                                    type="text"
                                    className="form-control"
                                    placeholder="Add a Job"
                                    onChange={handleChangeService}
                                    value={service}
                                />
                                <CustomButton onClickHandler={addList} variant="info"  label="Add a Job" />
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
                    <CustomButton onClickHandler={saveList} variant="success" className="btn-lg" label="Save" />
                    <CustomButton type="submit" label="Delete" variant="danger" className="btn-lg"/>
                </Form>
            </div>
        </div>
    );
};