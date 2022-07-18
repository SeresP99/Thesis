import Axios from "axios";

export function GetOptions(pollId){
    return Axios.post("http://localhost:4000/getPollOptions", {"pollId": pollId}, {
        headers:
            {"x-access-token": localStorage.getItem("token")}
    })
        .then(
            res => {
                return res.data.options;
            }
        )
}

export function CreateOption(pollId, title, description){
    const obj = {pollId, title, description};
    Axios.post("http://localhost:4000/addPollOption", obj, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
}

export function DeleteOption(id){
    Axios.post("http://localhost:4000/deletePollOption", {id : id}, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    });
}

export function UpdateOption(id, title, description){
    const obj = {id, title, description};
    Axios.post("http://localhost:4000/updatePollOption", obj, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
}