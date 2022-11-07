import Axios from "axios";

const backend = process.env.REACT_APP_SERVER + "/auth";

export const CheckIfAuthenticated = () => {
    return Axios.get(backend + "/checkAuth", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    }).then(
        res => {
            return res.data.auth;
        })
};
