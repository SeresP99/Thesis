import React, {useEffect, useState} from "react";
import {CheckLoginStatus, SendCredentials} from "../../assets/API/LoginRequests";
import StyledLogin, {LoginButton, TakeToSignupButton, TextInput, ElevatedDiv, StyledForm} from "../../components/styles/LoginStyle";
import Axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);

    const SignIn = async (e) => {
        e.preventDefault();
        const data = {username, password};
        const tryLogin = await SendCredentials(data);

        if (tryLogin)
            navigate("/dashboard");
        else
            setError(true);
    }

    useEffect(async () => {
        const auth = await CheckLoginStatus();
        if (auth)
            navigate("/dashboard");

    }, [])

    const NavToSignup = () => {
        navigate("/register");
    }

    return (
        <StyledLogin>
            <ElevatedDiv>
                <StyledForm onSubmit={SignIn}>
                    <div>
                        <h1 style={{fontSize: '50px'}}>Pollscape</h1>
                        <sub>Created by Peter Seres</sub>
                        <p style={{
                            visibility: error ? "visible" : "hidden",
                            //marginTop: "20px",
                            marginBottom: "-20px",
                            color: "#ff4b4b"
                        }}>Wrong username/password combination!</p>
                    </div>

                    <div>
                        <TextInput onChange={(e) => setUsername(e.target.value)} id="username" type="text"
                                   placeholder={"Username"}/>
                        <br/>
                        <TextInput onChange={(e) => setPassword(e.target.value)} id="password" type="password"
                                   placeholder={"Password"}/>

                    </div>
                    <LoginButton type="submit">
                        <p>Log in</p>
                    </LoginButton>

                </StyledForm>
                <TakeToSignupButton onClick={NavToSignup}>
                    <p>Sign Up</p>
                </TakeToSignupButton>
            </ElevatedDiv>
            <br/>
            <div>
            </div>
        </StyledLogin>
    )
}

export default Login;