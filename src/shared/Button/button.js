import React from "react";
import { Button } from 'react-bootstrap';

export const CustomButton = ({name, id, variant, label, onClickHandler, type, href, className}) => {
    return(
        <>
            <Button
                className={className}
                type={type}
                name={name}
                id={id}
                href={href}
                variant={variant}
                onClick={onClickHandler}
            >
                {label}
            </Button>
        </>
    )
}
