import React from "react"
import { Link } from "react-router-dom";
import { CustomButton } from '../../shared/Button/button';

export const Error = () => {
    return (
        <>
            <h1>URL NOT FOUND!</h1>;
            <Link to="/">
                <CustomButton label={"Return"} />
            </Link>
        </>
    )
}