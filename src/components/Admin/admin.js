import React from "react";
import {Tab, Tabs} from 'react-bootstrap'
import {FormJob} from '../../shared/Forms/FormJob';
import {Catalogo} from '../Catalogo/catalogo'

export const Admin = () =>{
    
    return(
        <Tabs
            id="controlled-tab-example"
        >    <Tab eventKey="home" title="Servicios">
                <FormJob/>
            </Tab>
            <Tab eventKey="profile" title="Usuarios">
                <Catalogo admin={true} />
            </Tab>
        </Tabs> 
    )
}
