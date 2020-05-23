import React from 'react';
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {CustomButton} from '../../shared/Button/button';

export const FormPassword = () =>{
    return (
        <div className="grid-container">
            <div className="grid-item-header">
                <Form style={{textAlign:"left"}}>
                    <Form.Group controlId="formBasicEmail">
                        <h1>Recover password</h1>
                        <Form.Control type="email" placeholder="Enter email" />
                        <p style={{fontSize: "1rem"}} className="text-muted">We'll never share your email with anyone else.</p>
                    </Form.Group>
                    <CustomButton variant="success" type="submit" label="Submit"/>
                </Form>
            </div>
        </div>
    );
};