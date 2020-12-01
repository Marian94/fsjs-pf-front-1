import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import {Catalogo} from "./components/Catalogo/catalogo";
import {Admin} from "./components/Admin/admin";
import {ContactUs} from "./components/ContactUs/contactUs";
import {LogIn} from "./components/Login/LogIn";
import {Home} from "./components/Home/home";
import {Error} from "./components/Error/error";
import {CustomNavbar} from "./components/Navbar/navbar";
import {Footer} from "./components/Footer/Footer";
import {ForgotPassword} from "./components/Password/password";
import {SignUpJob} from "./components/SingUp/SignUpJob";
import {Profile} from "./components/Profile/Profile";
import {SignUp} from "./components/SingUp/SignUp";
import {UserContext} from "./context/userContext"

export default function App(){
    const [user, setUser] = useState(null);
    return(
        <div>
            <UserContext.Provider value = {{user, setUser}}>
                <CustomNavbar/>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/administration" exact component={Admin}></Route>
                    <Route path="/catalogo" exact component={Catalogo}></Route>
                    <Route path="/contactUs" exact component={ContactUs}></Route>
                    <Route path="/login" exact component={LogIn}></Route>
                    <Route path="/forgotPassword" exact component={ForgotPassword}></Route>
                    <Route path="/signUp" exact component={SignUp}></Route>
                    <Route path="/signUpJob" exact component={SignUpJob}></Route>
                    <Route path="/profile" exact component={Profile}></Route>
                    <Route component={Error}></Route>
                </Switch>
            </UserContext.Provider>
            {/* <Footer/> */}
        </div>
    );
}

