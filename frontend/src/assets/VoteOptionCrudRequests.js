import Axios from "axios";

const backend = process.env.REACT_APP_SERVER;

export function GetOptions(pollId) {
    return Axios.post(backend + "/getPollOptions", {"pollId": pollId}, {
        headers:
            {"x-access-token": localStorage.getItem("token")}
    })
        .then(
            res => {
                return res.data.options;
            }
        )
}

export function CreateOption(pollId, title, description) {
    const obj = {pollId, title, description};
    return Axios.post(backend + "/addPollOption", obj, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then(
        res => {
            return res.data;
        })
}

export function DeleteOption(id) {
    Axios.post(backend + "/deletePollOption", {id: id}, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });
}

export function UpdateOption(id, title, description) {
    const obj = {id, title, description};
    Axios.post(backend + "/updatePollOption", obj, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
}