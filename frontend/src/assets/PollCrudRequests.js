import Axios from "axios";

export function PostCreatePoll(poll) {
    return Axios.post("http://localhost:4000/createPoll", poll, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then(res => {
        return res.data.pollId;
    })
}
