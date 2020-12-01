import React from "react";
import {Carousel} from 'react-bootstrap';
import {Img} from "../Image/img";
import { Link } from "react-router-dom";
import { CustomButton } from '../Button/button';
import Profesion from "../../assets/img/oficios.jpg";
import Foto4 from "../../assets/img/foto4.jpg";
import Foto2 from "../../assets/img/foto2.jpg";
import Servicios from "../../assets/img/servicios.jpg";
import "./Carousel.css";

 export const CustomCarousel = () =>{
    return(
        <Carousel className ="text-center">
            <Carousel.Item >
                <Img alt="Profesiones" src={Foto4} width="100%" height="40%" />
                <Carousel.Caption>
                <div className="bg-text">
                    <h3 className="h3media">¿Quieres ofrecer tus servicios?</h3>    
                </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
                <Img alt="Profesiones" src={Foto2} width="100%" height="100%" />
                <Carousel.Caption>
                <div className="bg-text">
                    <h3 className="h3media">AppTool</h3>
                    <p className="pmedia">Es una aplicación que te ayudará a encontar a la persona indicada para el servicio que necesitas.</p>
                </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
 }