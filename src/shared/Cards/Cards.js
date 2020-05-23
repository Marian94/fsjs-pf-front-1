import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import {CustomButton} from '../Button/button';

export const CustomCard = ({id, name, nombrePersona, descripcionPersona, servicios, foto}) =>{
    return(
        <>
            <Card style={{ width: '25rem' }} id={id} name={name}>
                <Card.Img  variant="top" alt={nombrePersona} src={foto} width="350" height="350"/>
                <Card.Body>
                    <Card.Title>{nombrePersona}</Card.Title>
                    <Card.Text>
                        {descripcionPersona}
                    </Card.Text>
                    <ListGroup variant="flush">
                        
                        
                            <ListGroup.Item>{servicios}</ListGroup.Item>
                     </ListGroup>
                    <CustomButton variant="primary">Go somewhere</CustomButton>
                </Card.Body>
            </Card>
        </>
    )
}