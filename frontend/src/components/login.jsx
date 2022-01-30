import React, {useState} from "react";
import StyledLogin, {LoginButton, TextInput} from "./styles/Login.styled";
import Axios from "axios";

//const [loginStatus, setLoginStatus] = useState(false);

function LogIn() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const SignIn = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/login", {
            username: data.email,
            password: data.password
        })
            .then(
                res => {
                    console.log(res.data);
                })
    }

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
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
        </StyledLogin>
    )
}

export default LogIn;