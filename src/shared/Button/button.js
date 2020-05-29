import React from "react";
import { Button } from 'react-bootstrap';

export const CustomButton = ({name, id, variant, label, onClickHandler, type, href, className, disabled}) => {
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
                disabled={disabled}
            >
                {label}
            </Button>
        </>
    )
}
