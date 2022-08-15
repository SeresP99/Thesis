import Axios from "axios";

const backend = process.env.REACT_APP_SERVER;


export function SignUp(email, username, password) {
    return Axios.post(backend + "/register", {
        email: email,
        username: username,
        password: password
    }).then(
        res => {
            return res.data.success;
        }
    )
}