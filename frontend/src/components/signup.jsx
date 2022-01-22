import React from "react";
import StyledSignup, {SignupButton, TextInput} from "./styles/Signup.styled"

const Signup = () => {
    const SignIn = (e) => {
        e.preventDefault();
    }
    return (
        <StyledSignup>
            <form onSubmit={SignIn}>
                <div>
                    <h1>Plum</h1>
                    <sub>Created by Peter Seres</sub>
                </div>
                <div>
                    <TextInput type="text" placeholder={"Email"}/>
                    <br/>
                    <TextInput type="text" placeholder={"Full Name"}/>
                    <br/>
                    <TextInput type="password" placeholder={"Password"}/>
                </div>
                <SignupButton>
                    <p>Create account</p>
                </SignupButton>
            </form>
        </StyledSignup>
    )
}

export default Signup;