import React, {useEffect, useState} from "react";
import StyledLogin, {LoginButton, TakeToSignupButton, TextInput, ElevatedDiv, StyledForm} from "./styles/Login.styled";
import Axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";


function LogIn() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [loginStatus, setLoginStatus] = useState(false);

    const SignIn = (e) => {
        e.preventDefault();
        console.log(data);
        Axios.post("http://localhost:4000/login", {
            username: data.username,
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

    function takeToSignup() {
        navigate("/register");
    }

    return (
        <StyledLogin>
            <ElevatedDiv>
                <StyledForm onSubmit={SignIn}>
                    <div>
                        <h1>Plum</h1>
                        <sub>Created by Peter Seres</sub>
                    </div>
                    <div>
                        <TextInput onChange={(e) => handleChange(e)} id="username" type="text"
                                   placeholder={"Username"}/>
                        <br/>
                        <TextInput onChange={(e) => handleChange(e)} id="password" type="password"
                                   placeholder={"Password"}/>
                    </div>
                    <LoginButton type="submit">
                        <p>Log in</p>
                    </LoginButton>

                </StyledForm>
                <TakeToSignupButton onClick={() => takeToSignup()}>
                    <p>Sign Up</p>
                </TakeToSignupButton>
            </ElevatedDiv>
            <br/>
            <div>

            </div>
        </StyledLogin>
    )
}

export default LogIn;