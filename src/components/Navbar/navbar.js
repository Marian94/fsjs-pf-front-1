import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Img} from '../../shared/Image/img'
import Tools from "../../assets/img/tools.png";
import Home from "../../assets/img/home.png";
import Profile from "../../assets/img/profile.png";
import Search from "../../assets/img/search.png";
import LogOut from "../../assets/img/logout.png";
import LogIn from "../../assets/img/login.png";
import Admin from "../../assets/img/admin.png";
import { UserContext } from "../../context/userContext";

export const CustomNavbar = () =>{
    const {user, setUser} = useContext(UserContext);
    
    return(
        <Navbar collapseOnSelect expand="lg" sticky="top" style={{background: "#FFFAFA"}}>
            <Navbar.Brand>
                <Img alt="App Tool" src={Tools} width="50" height="50" className="d-inline-block align-top"/>
                {' '}
                {user ?
                    
                    (<b>App Tool Bienvenid@ {user.firstName}</b>):(<b>AppTool</b>)
                }
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link>
                        <Link to="/"> 
                                Inicio <br/>
                                <Img alt="Home" src={Home} width="30" height="30" className="d-inline-block align-top"/>
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/catalogo">
                            Catalogo <br/>
                            <Img alt="Search" src={Search} width="30" height="39" className="d-inline-block align-top"/>
                        </Link>
                    </Nav.Link>
                    {user ?
                        (
                            <>
                            {user.admin === true && (
                                <Nav.Link>
                                    <Link to="/administration">
                                        Admin <br/>
                                        <Img alt="Admin" src={Admin} width="30" height="40" className="d-inline-block align-top"/>
                                    </Link>
                                </Nav.Link>
                            )}
                                <Nav.Link>
                                    <Link to="/profile">
                                        Profile <br/>
                                        <Img alt="Account" src={Profile} width="30" height="40" className="d-inline-block align-top"/>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link onClick={() => setUser(null)}>
                                    <Link to="/">
                                        Log Out <br/>
                                        <Img alt="Log Out" src={LogOut} width="30" height="30" className="d-inline-block align-top"/>
                                    </Link>
                                </Nav.Link>
                            </>
                        ):
                        ( 
                            <Nav.Link>
                                <Link to="/login">
                                    Log In<br/>
                                    <Img alt="Log In" src={LogIn} width="30" height="30" className="d-inline-block align-top"/>
                                </Link>
                            </Nav.Link>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
