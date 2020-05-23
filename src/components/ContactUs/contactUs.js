import React from "react";
import {CustomInput} from "../../shared/Inputs/input";
// import {TextArea} from "../../shared/TextArea/input";

export const ContactUs = () => {
    return (
        <>
            <CustomInput type="text" name="nombre" id="nombre"/>
            <CustomInput type="text" name="apellido" id="apellido"/>
            {/* <TextArea name="comentario" id="comentario"/> */}
        </>
    )
};
  