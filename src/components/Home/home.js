import React from 'react';
import { CustomCarousel } from '../../shared/Carousel/carousel';
import Foto2 from "../../assets/img/foto2.jpg"
import Image from 'react-bootstrap/Image'
import { Container, Jumbotron,  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { CustomButton } from '../../shared/Button/button';
import Typist from 'react-typist';

export const Home = () =>{
    return(
        <Jumbotron style={{backgroundColor:"white"}} fluid> 
            <Container  style={{textAlign:"center"}} >

            <Typist cursor={{show:false}}>
        <h1 color="white"> The place to find your electrician</h1>
        <Typist.Backspace count={12} delay={300} />
        <h1 color="white" margin="none"> plumber </h1>
        <Typist.Backspace count={9} delay={300} />
        <h1  color="white" margin="none"> builder </h1>
        </Typist>
                <Image height="50%" width="100%" src={Foto2}></Image>
                <Link style={{textAlign:"center"}} to="/signUpJob" >
                    <CustomButton variant="danger" label="Submit a recomendation" style={{textAlign:"center"}}/>
                </Link>
            </Container>
        </Jumbotron>
    )
}
