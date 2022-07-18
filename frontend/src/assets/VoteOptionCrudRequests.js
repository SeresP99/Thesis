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