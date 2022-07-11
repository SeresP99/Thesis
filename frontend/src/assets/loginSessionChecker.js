import {useEffect} from "react";
import Axios from "axios";

const backend = process.env.REACT_APP_SERVER;

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

export const RegularAuthCheck = () => {
    const interval = setInterval(() => {
        CheckIfAuthenticated();
    }, 5000);
    return () => clearInterval(interval);
};