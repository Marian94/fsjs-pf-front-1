import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

export const CustomDropdown = ({id, className, variant, items, placeHolder, handleFunction, value}) =>{
    
    
    return (
    <>
        <Dropdown
            style={{ width: '25rem' }}
            onSelect={e => handleFunction(e)}
        >
            <Dropdown.Toggle
                id={id}
                className={className}
                variant={variant}
            >   
            {value || placeHolder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {items.map(item => (
                    <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    </>
    );
}