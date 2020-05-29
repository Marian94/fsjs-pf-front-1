import React, {useContext, useState} from 'react';
import {Form, Alert} from 'react-bootstrap';
import {useFormik } from "formik";
import * as Yup from 'yup';
import { Link, Redirect } from "react-router-dom";
import {CustomButton} from '../Button/button';
import {UserContext} from '../../context/userContext';
import axios from 'axios';

export const FormLogIn = () =>{
    const initialValues = {
        email: '',
        password: ''
    };
    const validationSchema =  Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            let userLogin = {};
            const ruta = encodeURI('/user/login');
            const reqconfig= {
                "baseURL" : "http://localhost:8000",
                "headers":{
                    "content-type":"application/json"
                }
            };
            setNotSuccess("");
            axios.post(ruta, values, reqconfig).then((res) => {
                setLink(true);
                 userLogin =res.data.result.user;
                 userLogin.token= res.data.result.token;
                 setUser(userLogin);
            })
            .catch(err => {
                console.log("CATCH = ", err.response);
                setNotSuccess(err.response.data.message);
    
            });
        },
    });    
    const {user, setUser} = useContext(UserContext);
    const [link, setLink] = useState(false);
    const [notSuccess, setNotSuccess] = useState('');
    
    return(
        <div className="grid-container">
        <div className="grid-item-header">
            <Form onSubmit={formik.handleSubmit} style={{textAlign:"left"}}>
                <Form.Group>
                    <Form.Label>Correo</Form.Label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Correo"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.email}</p>
                        </Alert>
                    ) : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>
                    <Link to="/forgotPassword">
                        <p style={{fontSize: "1rem", textAlign:"right"}} >Olvide la contraseña.</p>
                    </Link>
                    {formik.touched.password && formik.errors.password ? (
                            <Alert variant='danger'>
                                <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.password}</p>
                            </Alert>
                    ) : null}
                </Form.Group>
                {notSuccess !== "" &&(
                    <Form.Group>
                        <Alert variant="danger">
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {notSuccess}
                            </p>
                        </Alert>
                    </Form.Group>
                )}
                <CustomButton type="submit" label="Enviar" variant="success" className="btn-lg"/>
                {link ? <Redirect to ="/" />: null}
                <br/>
                <br/>
                <p style={{fontSize: "1rem"}}>Si no tienes cuenta, <Link to="/signUp">registrate aqui.</Link></p>
            </Form>
        </div>
    </div>
    );
};