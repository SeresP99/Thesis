import Axios from "axios";

const backend = process.env.REACT_APP_SERVER;

export function PostCreatePoll(poll) {
    return Axios.post(backend + "/createPoll", poll, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then(res => {
        return res.data.pollId;
    })
}
