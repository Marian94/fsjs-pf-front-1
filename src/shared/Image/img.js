import React from "react";

export const Img = ({alt, src, width, height, className}) => {
    return(
        <>
            <img
                alt={alt}
                src={src}
                width={width}
                height={height}
                className={className}
            />
        </>
    )
}
