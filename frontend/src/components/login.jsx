import React from "react";
import StyledLogin, {LoginButton, TextInput} from "./styles/Login.styled";

const LogIn = () => {
    const SignIn = (e) => {
        e.preventDefault();
    }
    return(
        <StyledLogin>
            <form onSubmit={SignIn}>
                <div>
                    <h1>Plum</h1>
                    <sub>Created by Peter Seres</sub>
                </div>
                <div>
                    <TextInput type="text" placeholder={"Email"}/>
                    <br/>
                    <TextInput type="password" placeholder={"Password"}/>
                </div>
                <LoginButton>
                    <p>Log in</p>
                </LoginButton>
            </form>
        </StyledLogin>
    )
}

export default LogIn;