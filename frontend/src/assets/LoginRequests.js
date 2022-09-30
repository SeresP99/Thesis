import Axios from "axios";

const backend = process.env.REACT_APP_SERVER + "/auth";


export function SendCredentials(data) {

    return Axios.post(backend + "/login", {
        username: data.username,
        password: data.password
    })
        .then(
            res => {
                if (res.data.auth === true)
                    localStorage.setItem("token", res.data.token);
                return res.data.auth;
            })

}

export function CheckLoginStatus() {
    return Axios.get(backend + "/checkAuth", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    }).then(
        (res) => {
            return res.data.auth;
        });
}