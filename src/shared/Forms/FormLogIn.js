import React, {useContext, useState} from 'react';
import {Form, Alert} from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {CustomButton} from '../Button/button';
import {UserContext} from '../../context/userContext';
import {login} from '../../utils/login';

export const FormLogIn = () =>{

    const {user, setUser} = useContext(UserContext);
    const [msg, setMsg] = useState("");
    const [link, setLink] = useState(false);
    
    const onClickUser = async (evt) => {
        evt.preventDefault();
        const user = await login();
        if(document.getElementById("formBasicEmail").value === user.email && document.getElementById("formBasicPassword").value === user.password){
            setUser(user);
            setMsg("");
            setLink(true);
        }else{
            setMsg("Wrong email or password");
        }

    };
    
    return(
        <div className="grid-container">
            <div className="grid-item-header">
                <Form style={{textAlign:"left"}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <p style={{fontSize: "1rem"}} className="text-muted">We'll never share your email with anyone else.</p>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Link to="/forgotPassword">
                            <p style={{fontSize: "1rem", textAlign:"right"}} >Forgot my password.</p>
                        </Link>
                    </Form.Group>
                    {msg !== "" && (
                        <Alert variant='danger'>
                            <p style={{fontSize: "1rem", color:"#721c24"}}>{msg}</p>
                        </Alert>
                    )}
                    <CustomButton variant="success" type="submit" label="Submit" onClickHandler={onClickUser}/>
                    {link ? <Redirect to ="/" />: null}
                    <br/>
                    <br/>
                    <p style={{fontSize: "1rem"}}>If you don't have an account yet,  <Link to="/signUp">start here.</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};