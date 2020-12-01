import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {Form, Alert} from 'react-bootstrap';
import {useFormik } from "formik";
import * as Yup from 'yup';
import {CustomButton} from '../Button/button';
import {Checkbox} from '../CheckBox/checkbox';
import axios from 'axios';

const Horas = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const FormSignUp = ({job}) => {
    const FILE_SIZE = 160 * 1024 * 1024;
    const initialValues = {
        firstName: '',
        lastName: '',
        // email: '',
        celular: '',
        telefono: '',
        // password: '',
        // changepassword: '',
        address1: '',
        colonia: '',
        municipio: '',
        // postalCode: '',
        file: undefined,
    };
    const validationSchema =  Yup.object({
        firstName: Yup.string()
            .min(2, 'Name must be more than 2 characters')
            .max(15, 'Name must be 15 characters or less')
            .required('Name is required'),
        lastName: Yup.string()
            .min(2, 'Last Name must be more than 2 characters')
            .max(20, 'Last Name must be 20 characters or less')
            .required('Last Name is required'),
        // email: Yup.string()
        //     .email('Invalid email address')
        //     .required('Email is required'),
        celular: Yup.string()
            .required('Celular is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        telefono: Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        address1: Yup.string()
            .min(5, 'Address must be more than 5 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Address is required'),  
        colonia: Yup.string()
            .min(5, 'Address must be more than 5 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Colonia is required'),  
        municipio: Yup.string()
            .required('Municipio is required!'),
        // postalCode: Yup.string()
        //     .required('CP is required')
        //     .matches(/^[0-9]+$/, 'Must be only digits')
        //     .min(5, 'Must be exactly 5 digits')
        //     .max(5, 'Must be exactly 5 digits'),
        // password: Yup.string()
        //     .required('Ingrese una contraseña')
        //     .matches(
        //         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        //         'Debe de tene minimo 8 caracters y un numero'
        //     ),
        // changepassword: Yup.string()
        //     .required('Confirme la contraseña')
        //     .when('password', {
        //         is: val => (val && val.length > 0 ? true : false),
        //         then: Yup.string().oneOf(
        //         [Yup.ref('password')],
        //         'Las contraseñas deben de ser iguales'
        //         )
        //     }),
        file: Yup.mixed()
            .required("A file is required")
            .test(
              "fileSize",
              "File too large",
              value => value && value.size <= FILE_SIZE
            )
    });
    if (job) {
        initialValues.description = "";
        initialValues.checkboxGroup = [];
        initialValues.schedule = '';
        initialValues.payMethod = '';
        initialValues.specialServices = '';
        validationSchema.schedule= Yup.string().required('Ingrese su horario');
        validationSchema.payMethod= Yup.string().required('Ingrese su metodo de pago');
        validationSchema.specialServices= Yup.string().required('');
        validationSchema.description= Yup.string().max(120, 'Must be exactly 120 characters');  
        validationSchema.checkboxGroup= Yup.string().required(); 
    }
    const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
        const ruta = encodeURI('/user');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"multipart/form-data"
            }
        };
        values.job = (job)? true : false;
        values.admin = false;
        values.active = true;
        setNotSuccess("");
        const fd = new FormData();
        for(let k in values) {
            if(k==="file") {
                fd.append(k, values[k], values[k].name);
            }else {
                fd.append(k, values[k]);
            }
        }
        axios.post(ruta, fd, reqconfig).then((res) => {
            console.log(res.data.result);
            setSuccess("Usuario agregado");
        })
        .catch(err => {
            console.log("CATCH = ", err.response);
            setNotSuccess(err.response.data.message);

        });
      },
    });
    const searchInput = useRef(null)
    const [success, setSuccess] = useState('');
    const [notSuccess, setNotSuccess] = useState('');
    const [list, setList] = useState([]);
    const [days, setDays] = useState([
        {
            day: "Monday",
            horarioI:"",
            horarioS:"",
            checked:false
        },
        {
            day: "Tuesday",
            horarioI:"",
            horarioS:"",
            checked:false
        },
        {
            day: "Wednesday",
            horarioI:"",
            horarioS:"",
            checked:false
        },
        {
            day: "Thursday",
            horarioI:"",
            horarioS:"",
            checked:false
        },
        {
            day: "Friday",
            horarioI:"",
            horarioS:"",
            checked:false
        },
        {
            day: "Saturday",
            horarioI:"",
            horarioS:"",
            checked:false
        }
    ]);
    const [pay, setPay] = useState([
        {
            type:"Credit card",
            checked: false
        },
        {
            type:"Effective",
            checked: false
        }
    ]);
    const [special, setSpecial] = useState([
        {
            type:"Sunday",
            checked: false
        },
        {
            type:"24 Hrs",
            checked: false
        },
        {
            type:"Home service ",
            checked: false
        }
    ]);
    function handleFocus(){
      setNotSuccess("");
      searchInput.current.focus();
    }
    useEffect(() => {
        axios.get("http://localhost:8000/services").then( res =>{
            setList(res.data.result)
        }).catch(e =>{ console.error(e)})

    }, []);
    
  return (
    <div className="grid-container">
        <div className="grid-item-header">
            <Form onSubmit={formik.handleSubmit} style={{textAlign:"left"}}>
                <Form.Group>
                    <Form.Label>First and Last Name</Form.Label>
                    <>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Name</span>
                        </div>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                         <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>
                    <div className="input-group" style={{}}>
                    
                    {formik.touched.firstName && formik.errors.firstName ? (
                            <Alert variant='danger'>
                                <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.firstName}</p>
                            </Alert>
                        ) : null}
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <Alert variant='danger'>
                                <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.lastName}</p>
                            </Alert>
                        ) : null}

                        </div>
                        </>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone(s)</Form.Label>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Celphone"
                            onChange={formik.handleChange}
                            value={formik.values.celular}
                        />
                    </div>
                    {formik.touched.celular && formik.errors.celular ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.celular}</p>
                        </Alert>
                    ) : null}
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="telefono"
                            name="telefono"
                            type="text"
                            placeholder="Other phone"
                            onChange={formik.handleChange}
                            value={formik.values.telefono}
                        />
                    </div>
                    {formik.touched.telefono && formik.errors.telefono ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.telefono}</p>
                        </Alert>
                    ) : null}
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Correo</Form.Label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input
                            ref={searchInput}
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
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Confirme Contraseña"
                            name="changepassword"
                            onChange={formik.handleChange}
                            value={formik.values.changepassword}
                        />
                    </div>
                    <div className="input-group">
                        {formik.touched.password && formik.errors.password ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.password}</p>
                                </Alert>
                        ) : null}
                        {formik.touched.changepassword && formik.errors.changepassword ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.changepassword}</p>
                                </Alert>
                        ) : null}
                    </div>
                </Form.Group> */}
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="address1"
                            name="address1"
                            type="text"
                            placeholder="Street and number"
                            onChange={formik.handleChange}
                            value={formik.values.address1}
                        />
                    </div>
                    {formik.touched.address1 && formik.errors.address1 ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.address1}</p>
                        </Alert>
                    ) : null}
                </Form.Group>
                <Form.Group>
                    <>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="colonia">Suburb</label>
                            <input
                            className="form-control"
                            id="colonia"
                            name="colonia"
                            type="text"
                            placeholder="Suburb"
                            onChange={formik.handleChange}
                            value={formik.values.colonia}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Municipio</label>  
                            <select
                                name="municipio"
                                value={formik.values.municipio}
                                onChange={formik.handleChange}
                                style={{ display: 'block', width:'100%', fontSize: "1.5rem"}}
                            >
                                <option value="" disabled>Search...</option>
                                <option value="Guadalajara">Guadalajara</option>
                                <option value="Tonala">Tonala</option>
                                <option value="Tlajomulco">Tlajomulco</option>
                                <option value="Tlaquepaque">Tlaquepaque</option>
                                <option value="Zapopan">Zapopan</option>
                            </select>
                        </div>
                        {/* <div className="form-group col-md-2">
                            <label htmlFor="postalCode">C.P</label>
                            <input
                                className="form-control"
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                placeholder="45040"
                                onChange={formik.handleChange}
                                value={formik.values.postalCode}
                            />
                        </div> */}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            {formik.touched.colonia && formik.errors.colonia ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.colonia}</p>
                                </Alert>
                            ) : null}
                        </div>
                        <div className="form-group col-md-4">
                            {formik.touched.municipio && formik.errors.municipio ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.municipio}</p>
                                </Alert>
                            ) : null}
                        </div>
                        {/* <div className="form-group col-md-2">
                            {formik.touched.postalCode && formik.errors.postalCode ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.postalCode}</p>
                                </Alert>
                            ) : null}
                        </div> */}
                     </div>
                    </>
                </Form.Group>
                {job === true && (
                    <>
                    <Form.Group>
                        <Form.Label>Jobs</Form.Label>
                        {list.map(item => (
                            <Checkbox
                                name="checkboxGroup"
                                key={item}
                                label={item}
                                value={item}
                                onChange={formik.handleChange}
                                checked={formik.values.checkboxGroup.includes(item)}
                            />
                        ))}
                        {formik.touched.checkboxGroup && formik.errors.checkboxGroup ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.checkboxGroup}</p>
                        </Alert>
                        ) : null}
                    </Form.Group>
                    <hr/>
                    <Form.Group>
                        <Form.Label>Schedule</Form.Label>
                        {days.map((dia, idx) => (
                            <div className="input-group">
                                <div className="form-group col-md-4">
                                    <Form.Check
                                        type="switch"
                                        label={dia.day}
                                        id={dia.day}
                                        checked={dia.checked}
                                        onChange={() => {
                                            const newDays = [...days];
                                            newDays[idx].checked = !newDays[idx].checked;
                                            setDays(newDays);
                                            formik.values.schedule=JSON.stringify(newDays);
                                        }}
                                    />
                                </div>
                                {dia.checked && (
                                    <>
                                    <div className="form-group col-md-4"> 
                                        <label className="custom-label">Entrada</label>  
                                        <select
                                            value={dia.horarioI}
                                            onChange={e => {
                                                 const newDays = [...days];
                                                 newDays[idx].horarioI = e.target.value;
                                                 setDays(newDays);
                                                 formik.values.schedule=JSON.stringify(newDays);
                                            }}
                                            style={{ display: 'block', width:'100%', fontSize: "1rem"}}
                                        >
                                            {Horas.map( hora => (
                                                <option value={hora}>{hora}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4"> 
                                        <label className="custom-label">Salida</label>  
                                        <select
                                            value={dia.horarioS}
                                            onChange={e => {
                                                const newDays = [...days];
                                                newDays[idx].horarioS = e.target.value;
                                                setDays(newDays);
                                                formik.values.schedule=JSON.stringify(newDays);
                                           }}
                                            style={{ display: 'block', width:'100%', fontSize: "1rem"}}
                                        >
                                            {Horas.map( hora => (
                                                <option value={hora}>{hora}</option>
                                            
                                            ))}
                                        </select>
                                    </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </Form.Group>
                    <hr/>
                    <Form.Group>
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <label>Payment</label>  
                                {pay.map((method, idx) => (
                                    <div className="input-group">
                                        <Form.Check
                                            type="switch"
                                            label={method.type}
                                            id={method.type}
                                            checked={method.checked}
                                            onChange={() => {
                                                const newMethod = [...pay];
                                                newMethod[idx].checked = !newMethod[idx].checked;
                                                setPay(newMethod);
                                                formik.values.payMethod=JSON.stringify(newMethod);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="postalCode">Special Services</label>
                                {special.map((method, idx) => (
                                    <div className="input-group">
                                        <Form.Check
                                            type="switch"
                                            label={method.type}
                                            id={method.type}
                                            checked={method.checked}
                                            onChange={() => {
                                                const newSpecial = [...special];
                                                newSpecial[idx].checked = !newSpecial[idx].checked;
                                                setSpecial(newSpecial);
                                                formik.values.specialServices = JSON.stringify(newSpecial);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Form.Group>
                    <hr/>
                    <Form.Group>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Review</span>
                            </div>
                            <textarea
                                id="description" 
                                className="form-control" 
                                name="description"
                                aria-label="With textarea"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                        {formik.touched.description && formik.errors.description ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.description}</p>
                        </Alert>
                        ) : null}
                    </Form.Group>
                    </>
                )}
                <Form.Group>
                    <input
                        type="file"
                        name="file"
                        title="Elige tu foto de perfil"
                        onChange={(evt)=>{
                            formik.setFieldValue("file", evt.currentTarget.files[0]);
                        }}
                        accept="image/*"
                    />
                    {formik.touched.file && formik.errors.file ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.file}</p>
                        </Alert>
                        ) : null}
                </Form.Group>
                {notSuccess !== "" &&(
                    <Form.Group>
                        <Alert variant="danger" dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {notSuccess}
                            </p>
                        <hr/>
                        <div className="d-flex justify-content-end">
                            <CustomButton onClickHandler={handleFocus} variant="outline-danger" label="Corregir"/>
                        </div>
                        </Alert>
                    </Form.Group>
                )}
                {success !== "" &&(
                    <Form.Group>
                        <Alert variant="success" dismissible>
                        <Alert.Heading>Success!</Alert.Heading>
                            <p>
                                {success}
                            </p>
                            <hr/>
                            <div className="d-flex justify-content-end">
                                <Link to="/">
                                    <CustomButton variant="outline-success" label="Success!"/>
                                </Link>
                            </div>
                        </Alert>
                    </Form.Group>
                )}
                {success === "" &&(
                    <CustomButton type="submit" label="Send" variant="success" className="btn-lg"/>
                )}
            </Form>
        </div>
    </div>
  );
};
