import React, { useState, useEffect, useContext } from "react";
import { CustomDropdown } from "../../shared/Dropdown/dropdown";
import {CustomButton} from '../../shared/Button/button';
import { CustomCard } from "../../shared/Cards/Cards";
import {Alert} from 'react-bootstrap';
import "./Catalogo.css";
import { UserContext } from "../../context/userContext";
import axios from 'axios';

export const Catalogo = ({admin}) =>{
    const [valueDropdown, setValueDropdown] = useState("");
    const [listServices, setList] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [listOfPeople, setListOfPeople] = useState([]);
    const {user, setUser} = useContext(UserContext);
    
    const selectedOption = (x) => {
        setValueDropdown(x);
        setListOfPeople(catalog[x]);
    }
    
    useEffect(() => {
        axios.get("http://localhost:8000/services").then( res =>{
            setList(res.data.result)
        }).catch(e =>{ console.error(e)});
    }, []);

    useEffect(()=>{
        if(admin){
            axios.get("http://localhost:8000/user/catalog/admin").then( res =>{
                setListOfPeople(res.data.result.catalog);
            }).catch(e =>{ console.error(e)})
        }else{
            axios.get("http://localhost:8000/user/catalog").then( res =>{
                if(res.data.result)
                setCatalog(res.data.result);
            }).catch(e =>{ console.error(e)})
        }
    }, []);

    function deleteUser(id){
        const ruta= "http://localhost:8000"
        axios.delete(`${ruta}/user/delete/${id}`).then((res) => {
            setListOfPeople(res.data.result.catalogAdmin);
            alert("Usuario eliminado");
        })
        .catch(err => {
            setListOfPeople(undefined);
            console.log("CATCH = ", err.response);
        
        });
    }
    const [overlay, setOverlay] = useState(false);
    const handleShow = () => setOverlay(overlay => !overlay);
    return(
        <div className="grid-container">
            {admin ? (
                <>
                {listOfPeople ?(
                    <>
                        {listOfPeople.map(item => (
                            <div className="grid-item">
                            <CustomCard 
                                admin={true} 
                                catalogo={true}
                                horario={[]} 
                                key={item._id} 
                                id={item._id} 
                                user={user} 
                                email={item.email} 
                                onClickHandler={() => deleteUser(item._id)} 
                                labelButton="Eliminar" 
                                variant="danger" 
                                button={true} 
                                nombrePersona={item.firstName+" "+item.lastName} 
                                foto={"http://localhost:8000/uploads/"+item.image}
                            />
                            </div>             
                        ))}
                    </>
                ):(
                    <div className="grid-item">
                        <Alert variant="dark" >
                            <Alert.Heading>No hay personas que mostrar!</Alert.Heading>
                        </Alert>
                    </div>
                )}
                </>
            ):(
                <div className="grid-item-header">
                    <>
                    <CustomDropdown 
                        id={"catalogoDropdown"} 
                        variant={"success"} 
                        placeHolder={"Search..."} 
                        items={listServices}
                        className={"justify-content-center"}
                        handleFunction={selectedOption}
                        value={valueDropdown}
                        
                    />
                    <br/>
                    </>
                    {listOfPeople ? (
                        <>
                        {listOfPeople.map((item, idx) => (
                            <div className="grid-item">
                                <CustomCard 
                                    catalogo={true}
                                    useOverlay={true} 
                                    user={user} 
                                    overlay={overlay} 
                                    onClickHandler={handleShow} 
                                    labelButton="Description" 
                                    variant="success" 
                                    button={true} 
                                    descripcionPersona={item.description} 
                                    nombrePersona={item.firstName+" "+item.lastName}
                                    domicilio={`Calle: ${item.address1} Colonia: ${item.colonia}, ${item.municipio}`} 
                                    horario={item.schedule} 
                                    servicios={item.checkboxGroup} 
                                    telefono={item.celular}
                                    foto={"http://localhost:8000/uploads/"+item.image}
                                    pago={item.payMethod}
                                    otrosServicios={item.specialServices}

                                />
                            </div>      
                        ))}
                        </>
                    ) : (
                        <div className="grid-item">
                            <Alert variant="dark" >
                                <Alert.Heading>No hay personas que mostrar!</Alert.Heading>
                            </Alert>
                        </div>
                    )}
                    
                </div>
            )}
        </div>
    )
}