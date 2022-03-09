import React, {useState} from "react";
import StyledSignup, {SignupButton, TextInput, StyledForm, ElevatedDiv, TakeToLoginButton} from "./styles/Signup.styled"
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const CreateAccount = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:4000/register", {
            email: data.email,
            username: data.username,
            password: data.password
        }).then(
            res => {
                console.log(res.data);
                if (res.data.success === true)
                    navigate("/login");
                else
                    alert(res.data.message);
            }
        )
    };

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function takeToLogin(){
        navigate("/")
    }

    return (
        <StyledSignup>
            <ElevatedDiv>
                <StyledForm onSubmit={CreateAccount}>
                    <div>
                        <h1>Plum</h1>
                        <sub>Created by Peter Seres</sub>
                    </div>
                    <div>
                        <TextInput onChange={(e) => handleChange(e)} id="email" type="text" placeholder={"Email"}/>
                        <br/>
                        <TextInput onChange={(e) => handleChange(e)} id="username" type="text"
                                   placeholder={"Username"}/>
                        <br/>
                        <TextInput onChange={(e) => handleChange(e)} id="password" type="password"
                                   placeholder={"Password"}/>
                    </div>
                    <SignupButton>
                        <p>Create account</p>
                    </SignupButton>
                </StyledForm>
                <TakeToLoginButton onClick={() => takeToLogin()}>
                    Have An Account?
                </TakeToLoginButton>
            </ElevatedDiv>
        </StyledSignup>
    )
}

export default Signup;