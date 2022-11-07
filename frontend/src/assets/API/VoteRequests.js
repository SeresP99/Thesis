import Axios from "axios";

const backend = process.env.REACT_APP_SERVER + "/vote";

export function Vote(pollOptionId, pollId) {
    return Axios.post(backend, {pollOptionId, pollId},
        {
            headers: {"x-access-token": localStorage.getItem("token")},
        })
        .then(res => {
            return res.data;
        })
}