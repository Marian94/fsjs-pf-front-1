import React from "react";
import Facebook from "../../assets/img/facebook.png";
import Instagram from "../../assets/img/instagram.png";
import {Img} from '../../shared/Image/img'
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () =>{
    return(
        <>
        <footer className="footer">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">Project Description</h5>
                        <p>This is a project for Centraal Academy. This app will help you to find the best option for an specific job.</p>
                    </div>
                    <div className="col-md-6 mt-md-0 mt-3 text-center">
                        <h5 className="text-uppercase justify-content-end">Contact Us</h5>
                        <Link to="/">
                            mgromero94@hotmail.com
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright: &emsp;
                <Link to="/">
                       apptool.com
                </Link>
                <br/> <br/>
                <Link to="/">
                    <Img alt="Log Out" src={Instagram} width="30" height="30" className="d-inline-block align-top"/>
                </Link>
                &emsp;
                <Link to="/">
                    <Img alt="Log Out" src={Facebook} width="30" height="30" className="d-inline-block align-top"/>
                </Link>
            </div>
        </footer>
        </>
    )
}
