import React from 'react';
import {Form, Alert} from 'react-bootstrap';
import {useFormik } from "formik";
import * as Yup from 'yup';
import {CustomButton} from '../Button/button';
import {Checkbox} from '../CheckBox/checkbox';
import axios from 'axios';
import multer from 'multer';

export const FormSignUp = ({job}) => {
    const FILE_SIZE = 160 * 1024 * 1024;
    const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        celular: '',
        telefono: '',
        password: '',
        changepassword: '',
        address1: '',
        colonia: '',
        municipio: '',
        postalCode: '',
        checkboxGroup: [],
        description: '',
        file: undefined,
    },
    // validationSchema: Yup.object({
    //     firstName: Yup.string()
    //         .min(2, 'Name must be more than 2 characters')
    //         .max(15, 'Name must be 15 characters or less')
    //         .required('Name is required'),
    //     lastName: Yup.string()
    //         .min(2, 'Last Name must be more than 2 characters')
    //         .max(20, 'Last Name must be 20 characters or less')
    //         .required('Last Name is required'),
    //     email: Yup.string()
    //         .email('Invalid email address')
    //         .required('Email is required'),
    //     celular: Yup.string()
    //         .required('Celular is required')
    //         .matches(/^[0-9]+$/, 'Must be only digits')
    //         .min(10, 'Must be exactly 10 digits')
    //         .max(10, 'Must be exactly 10 digits'),
    //     telefono: Yup.string()
    //         .matches(/^[0-9]+$/, 'Must be only digits')
    //         .min(10, 'Must be exactly 10 digits')
    //         .max(10, 'Must be exactly 10 digits'),
    //     description: Yup.array()
    //         .max(120, 'Must be exactly 120 characters'),  
    //     checkboxGroup: Yup.string()
    //         .required(),  
    //     address1: Yup.string()
    //         .min(5, 'Address must be more than 5 characters')
    //         .max(50, 'Must be 50 characters or less')
    //         .required('Address is required'),  
    //     colonia: Yup.string()
    //         .min(5, 'Address must be more than 5 characters')
    //         .max(50, 'Must be 50 characters or less')
    //         .required('Colonia is required'),  
    //     municipio: Yup.string()
    //         .required('Municipio is required!'),
    //     postalCode: Yup.string()
    //         .required('CP is required')
    //         .matches(/^[0-9]+$/, 'Must be only digits')
    //         .min(5, 'Must be exactly 5 digits')
    //         .max(5, 'Must be exactly 5 digits'),
    //     password: Yup.string()
    //         .required('Ingrese una contraseña')
    //         .matches(
    //             /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //             'Debe de tene minimo 8 caracters y un numero'
    //         ),
    //     changepassword: Yup.string()
    //         .required('Confirme la contraseña')
    //         .when('password', {
    //             is: val => (val && val.length > 0 ? true : false),
    //             then: Yup.string().oneOf(
    //             [Yup.ref('password')],
    //             'Las contraseñas deben de ser iguales'
    //             )
    //         }),
    //     file: Yup.mixed()
    //         .required("A file is required")
    //         .test(
    //           "fileSize",
    //           "File too large",
    //           value => value && value.size <= FILE_SIZE
    //         )
        
    // }),
    onSubmit: values => {
        const ruta = encodeURI('/signUp');
        const reqconfig= {
            "baseURL" : "http://localhost:8000",
            "headers":{
                "content-type":"application/json"
            }
        };
        values.admin = false;
        values.active = true;
        console.log(values.file);
        axios.post(ruta, values, reqconfig).then((res) => {
            console.log(res);    
        })
        .catch(err => {
            console.error(err);
        });
      },
    });
  return (
    <div className="grid-container">
        <div className="grid-item-header">
            <Form onSubmit={formik.handleSubmit} style={{textAlign:"left"}}>
                <Form.Group>
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Nombre completo</span>
                        </div>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                         <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Apellido"
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
                            <label htmlFor="inputState">Municipio</label>  
                            <select
                                name="municipio"
                                value={formik.values.municipio}
                                onChange={formik.handleChange}
                                style={{ display: 'block', width:'100%', fontSize: "1.5rem"}}
                            >
                                <option value="" disabled>Buscar...</option>
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
                {job ===true &&(
                    <>
                    <Form.Group>
                        <Form.Label>Servicios</Form.Label>
                        <Checkbox
                            name="checkboxGroup"
                            id="checkbox1"
                            label="Carpintero"
                            value="Carpintero"
                            onChange={formik.handleChange}
                            checked={formik.values.checkboxGroup.includes("Carpintero")}

                        />
                        <Checkbox
                            name="checkboxGroup"
                            id="checkbox2"
                            label="Cerrajero"
                            value="Cerrajero"
                            onChange={formik.handleChange}
                            checked={formik.values.checkboxGroup.includes("Cerrajero")}
                        />
                        <Checkbox
                            name="checkboxGroup"
                            id="checkbox3"
                            label="Pintor"
                            value="Pintor"
                            onChange={formik.handleChange}
                            checked={formik.values.checkboxGroup.includes("Pintor")}
                        />
                        {formik.touched.checkboxGroup && formik.errors.checkboxGroup ? (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{formik.errors.checkboxGroup}</p>
                        </Alert>
                        ) : null}
                    </Form.Group>
                    <Form.Group>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Descripcion del servicio</span>
                            </div>
                            <textarea className="form-control" id="description" name="description" aria-label="With textarea"></textarea>
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
                        title="Select a file"
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
                <CustomButton type="submit" label="Enviar" variant="success" className="btn-lg"/>
            </Form>
        </div>
    </div>
  );
};
