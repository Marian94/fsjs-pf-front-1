import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


export const CustomInput = ({type, label, name, id, length, className}) => {
    const[value, setValue] = useState("");
    const checkLenght = (x) =>{
        if(x.length <= length){
            setValue(x);
        }
    }
    
    return(
        <>
        <InputGroup>
            <FormControl 
                as={type} 
                aria-label={label}  
                id={id}
                onChange={e => checkLenght(e.target.value)}
            />
        </InputGroup>
        </>
    );
} 