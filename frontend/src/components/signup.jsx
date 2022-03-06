import React, {useState} from "react";
import StyledSignup, {SignupButton, TextInput} from "./styles/Signup.styled"
import Axios from "axios";

const Signup = () => {

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
                    return (<p>Successful sign up!</p>)
                else
                    return (<p>Unsuccessful sign up!</p>)
            }
        )
    };

    function handleChange(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    return (
        <StyledSignup>
            <form onSubmit={CreateAccount}>
                <div>
                    <h1>Plum</h1>
                    <sub>Created by Peter Seres</sub>
                </div>
                <div>
                    <TextInput onChange={(e) => handleChange(e)} id="email" type="text" placeholder={"Email"}/>
                    <br/>
                    <TextInput onChange={(e) => handleChange(e)} id="username" type="text" placeholder={"Username"}/>
                    <br/>
                    <TextInput onChange={(e) => handleChange(e)} id="password" type="password"
                               placeholder={"Password"}/>
                </div>
                <SignupButton>
                    <p>Create account</p>
                </SignupButton>
            </form>
        </StyledSignup>
    )
}

export default Signup;