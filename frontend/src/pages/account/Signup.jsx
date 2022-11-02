import React, {useState} from "react";
import StyledSignup, {
    SignupButton,
    TextInput,
    StyledForm,
    ElevatedDiv,
    TakeToLoginButton
} from "../../components/styles/Signup.styled"
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {SignUp} from "../../assets/SignupRequests";

const Signup = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const CreateAccount = async (e) => {
        e.preventDefault();

        const signupSuccess = await SignUp(data.email, data.username, data.password);
        if (signupSuccess === true)
            navigate("/login");
        else
            alert("Error creating account.");
    }

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function takeToLogin() {
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