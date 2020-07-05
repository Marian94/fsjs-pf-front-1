import React, { useState }from 'react';
import {Card, Modal} from 'react-bootstrap';
import {CustomButton} from '../Button/button';
import "./Cards.css";

export const CustomCard = ({
    id,
    catalogo,
    name, 
    admin,
    nombrePersona,
    useOverlay,
    telefono,
    pago,
    descripcionPersona,
    otrosServicios,
    servicios,
    foto,
    button,
    horario,
    variant,
    labelButton,
    onClickHandler,
    email,
    user,
    overlay,
    domicilio
}) =>{
    let disabled = false;
    console.log(nombrePersona)
    if(user){
        disabled = (id ===user._id)? true : false;
    }
    return(
        <>
            <Card style={{ width: '25rem' }} id={id} name={name} border="dark">
                <Card.Img  variant="top" alt={nombrePersona} src={foto} width="350" height="350"/>
                <hr/>
                <Card.Body>
                    {admin ?(
                        <>
                            <p className="custom-p">{nombrePersona}</p>
                            <p className="custom-p">{email}</p>
                        </> 
                    ):(
                        <>
                        <Card.Text>
                            {nombrePersona} <br/> 
                            {email}
                        </Card.Text>
                        <hr/>
                        <Card.Text>
                            Horario
                            {horario.map(item => (
                                <>
                                {item.checked ? (
                                    <>
                                    <p className="custom-p">{item.day} {item.horarioI} {item.horarioS}</p>
                                    
                                    </>
                                ):(
                                    <p></p>
                                )}
                                </>
                            ))}
                        </Card.Text>
                        <hr/>
                        </>
                    )}
                    
                    {(button && user) ? (
                        <CustomButton disabled={disabled} onClickHandler={onClickHandler} variant={variant} label={labelButton} domicilio/>
                    ): catalogo &&(
                        <p className="custom-p-small"> Es necesario estar logueado para contactar a la persona</p>
                    )}
                </Card.Body>
            </Card>
            {useOverlay && (
                <Modal show={overlay} onHide={onClickHandler}>
                    <Modal.Header closeButton>
                    <Modal.Title>{nombrePersona}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="custom-p">Telefono:</p>
                        {telefono}
                        <p className="custom-p">Horario:</p>
                        {horario.map(item => (
                            <>
                            {item.checked ? (
                                <>
                                {item.day} {item.horarioI} {item.horarioS}
                                
                                </>
                            ):(
                                <p></p>
                            )}
                            </>
                        ))}
                        <p className="custom-p">Domicilio:</p>
                        {domicilio}
                        <p className="custom-p">Metodos de pago:</p>
                        {pago.map(item => (
                            <>
                            {item.checked ? (
                                <>
                                <p>{item.type}</p>
                                </>
                            ):(
                                <p></p>
                            )}
                            </>
                        ))}
                        <p className="custom-p">Otros servicios:</p>
                        {servicios.map(item => (
                            <>
                                <p>{item}</p>
                            </>
                        ))}
                        <p className="custom-p">Servicios especiales:</p>
                        {otrosServicios.map(item => (
                            <>
                             {item.checked ? (
                                <>
                                <p>{item.type}</p>
                                </>
                            ):(
                                <p></p>
                            )}
                            </>
                        ))}
                        <p>{descripcionPersona}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton variant="secondary" label="Close"  onClickHandler={onClickHandler}/>
                        <CustomButton variant="primary" label="Contactar" onClickHandler={onClickHandler} disabled={true}/>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}