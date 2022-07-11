import {useEffect} from "react";

const backend = process.env.REACT_APP_SERVER;

export const CheckIfAuthenticated = () => {
    Axios.get(backend + "/checkAuth", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
    }).then(
        res => {
            return res.data.auth;
        })
};

export const RegularAuthCheck = () => {
    useEffect(() => {
        CheckIfAuthenticated();
    }, []);
};