import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {Form, Alert} from 'react-bootstrap';
import axios from 'axios';
import {useFormik } from "formik";
import * as Yup from 'yup';
import {CustomButton} from '../Button/button';
import {Checkbox} from '../CheckBox/checkbox';
import { UserContext } from "../../context/userContext";
import { CustomCard } from "../../shared/Cards/Cards";
import "./Form.css";

const Horas = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export const FormProfile = () => {
    const {user, setUser} = useContext(UserContext);
    const [checked, setChecked] = useState(user.active)
    const [notSuccess, setNotSuccess] = useState('');
    const [list, setList] = useState([]);
    const [days, setDays] = useState(user.schedule);
    const [pay, setPay] = useState(user.payMethod);
    const [special, setSpecial] = useState(user.specialServices);
    const initialValues = {
        celular: user.celular,
        telefono: user.telefono || "",
        address1: user.address1,
        colonia: user.colonia,
        municipio: user.municipio,
        postalCode: user.postalCode,
        file: '',
        active: user.active,
        id:user._id,
    };
    const validationSchema =  Yup.object({
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
        postalCode: Yup.string()
            .required('CP is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(5, 'Must be exactly 5 digits')
            .max(5, 'Must be exactly 5 digits'),
        file: Yup.mixed().required('')
    });
    if (user.job) {
        initialValues.description = user.description;
        initialValues.checkboxGroup = user.checkboxGroup;
        initialValues.schedule = JSON.stringify(user.schedule);
        initialValues.payMethod = JSON.stringify(user.payMethod);
        initialValues.specialServices = JSON.stringify(user.specialServices);
        validationSchema.schedule= Yup.string().required('Ingrese su horario');
        validationSchema.payMethod= Yup.string().required('Ingrese su metodo de pago');
        validationSchema.specialServices= Yup.string().required('');
        validationSchema.description= Yup.string().max(120, 'Must be exactly 120 characters');  
        validationSchema.checkboxGroup= Yup.string().required(''); 
    }
    const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
        let userLogin = {};
        const ruta = encodeURI('/user/profile');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"multipart/form-data"
            }
        };
        setNotSuccess("");
        const fd = new FormData();
        for(let k in values) {
            if(k==="file" && values[k] !== "") {
                fd.append(k, values[k], values[k].name);
            }else {
                fd.append(k, values[k]);
            }
        }
        axios.patch(ruta, fd, reqconfig).then((res) => {
            console.log(res.data.result);
            userLogin = res.data.result.updated;
            userLogin.token = user.token;
            setUser(userLogin);
            alert(res.data.result.message);
        }).catch(err => {
            console.log("CATCH = ", err.response);
            setNotSuccess(err.response.data.message);

        });
      },
    });
    useEffect(() => {
        axios.get("http://localhost:8000/services").then( res =>{
            setList(res.data.result)
        }).catch(e =>{ console.error(e)})

    }, []);
  return (
    <div className="grid-container">
        <div className="grid-item-header">
            <Form onSubmit={e => formik.handleSubmit(e)} style={{textAlign:"left"}}>
                <Form.Group>
                    <CustomCard catalogo={false} servicios={[]} admin={true} horario={[]} button={false} foto={"http://localhost:8000/uploads/"+user.image}/>
                    <input
                        type="file"
                        name="file"
                        title="Select a file"
                        onChange={(evt)=>{
                            formik.setFieldValue("file", evt.currentTarget.files[0]);
                        }}
                        accept="image/*"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Telefono(s)</Form.Label>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="celular"
                            name="celular"
                            type="text"
                            placeholder="Celular"
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
                            placeholder="Telefono de casa"
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
                <Form.Group>
                    <Form.Label>Calle</Form.Label>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="address1"
                            name="address1"
                            type="text"
                            placeholder="Santa Laura 123"
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
                            <label htmlFor="colonia">Colonia</label>
                            <input
                            className="form-control"
                            id="colonia"
                            name="colonia"
                            type="text"
                            placeholder="Ciudad de los niños"
                            onChange={formik.handleChange}
                            value={formik.values.colonia}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Municipio</label>  
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
                        <div className="form-group col-md-2">
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
                        </div>
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
                        <div className="form-group col-md-2">
                            {formik.touched.postalCode && formik.errors.postalCode ? (
                                <Alert variant='danger'>
                                    <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.postalCode}</p>
                                </Alert>
                            ) : null}
                        </div>
                     </div>
                    </>
                </Form.Group>
                {user.job && (
                    <>
                    <Form.Group>
                        <Form.Label>Oficios</Form.Label>
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
                        <Form.Label>Horario de trabajo</Form.Label>
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
                                                 console.log(newDays);
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
                                <label>Método de pago</label>  
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
                                <label htmlFor="postalCode">Especiales</label>
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
                                <span className="input-group-text">Descripcion del servicio</span>
                            </div>
                            <textarea
                                id="description" 
                                className="form-control" 
                                name="description"
                                placeholder="Your message"
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
                <hr/>
                {user.job && (
                    <>
                    <Form.Group>
                        <Form.Label>Cuenta Activa</Form.Label>
                        <Form.Check
                            id="active"
                            type="switch"
                            label={""}
                            name="active"
                            checked={checked}
                            onChange={() => {
                                setChecked(!checked)
                                formik.values.active = !checked;
                            }}
                        />
                    </Form.Group>
                    {!checked &&(
                        <Form.Group>
                            <Alert variant="danger" >
                            <Alert.Heading>Cuenta desactivada!</Alert.Heading>
                                <p>No apareceras en busquedas hasta que reactives tu cuenta.</p>
                            </Alert>
                        </Form.Group>
                    )}
                    {checked &&(
                        <Form.Group>
                            <Alert variant="success">
                            <Alert.Heading>Cuenta activada!</Alert.Heading>
                                <p>
                                    Ahora apareceras en busquedas.
                                </p>
                            </Alert>
                        </Form.Group>
                    )}
                    </>
                )}
                {notSuccess !== "" &&(
                    <Form.Group>
                        <Alert variant="danger" dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {notSuccess}
                            </p>
                        </Alert>
                    </Form.Group>
                )}
                <CustomButton type="submit" label="Guardar" variant="success" className="btn-lg"/>
            </Form>
        </div>
    </div>
  );
};
