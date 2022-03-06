import React, {useEffect, useState} from "react";
import StyledLogin, {LoginButton, TextInput} from "./styles/Login.styled";
import Axios from "axios";
import {Navigate} from "react-router-dom";


function LogIn() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [loginStatus, setLoginStatus] = useState(false);

    const SignIn = (e) => {
        e.preventDefault();
        console.log(data);
        Axios.post("http://localhost:4000/login", {
            username: data.email,
            password: data.password
        })
            .then(
                res => {
                    console.log(res.data);
                    if (res.data.auth === true) {
                        setLoginStatus(true);
                        localStorage.setItem("token", res.data.token);
                    } else
                        setLoginStatus(false);
                    console.log(loginStatus);
                })
    }

    const CheckIfAuthenticated = () => {
        Axios.get("http://localhost:4000/checkAuth", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            },
        }).then(
            res => {
                console.log(localStorage.getItem("token"));
                console.log(res.data.auth);
                setLoginStatus(res.data.auth);
            })
    };

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    useEffect(() => {
        CheckIfAuthenticated();
    }, [])

    if (loginStatus) {
        return <Navigate to={"/profile"} replace={true}/>
    }
    return (
        <StyledLogin>
            <form onSubmit={SignIn}>
                <div>
                    <h1>Plum</h1>
                    <sub>Created by Peter Seres</sub>
                </div>
                <div>
                    <TextInput onChange={(e) => handleChange(e)} id="email" type="text" placeholder={"Email"}/>
                    <br/>
                    <TextInput onChange={(e) => handleChange(e)} id="password" type="password"
                               placeholder={"Password"}/>
                </div>
                <LoginButton>
                    <p>Log in</p>
                </LoginButton>
            </form>
            <br/>
            <div>

            </div>
        </StyledLogin>
    )
}

export default LogIn;