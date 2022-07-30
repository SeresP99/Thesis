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

export function GetAllCreatedPolls() {
    return Axios.get(backend + "/getCreatedPolls", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    }).then(res => {
        return res.data.polls;
    })
}

export function GetPollDetails(pollId) {
    return Axios.post(backend + "/getPollDetails", {pollId}, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }
    ).then(res => {
            return res.data.pollDetails;
        }
    )
}

export function GetPollInvitation(pollId) {
    return Axios.post(backend + "/getPollInvitation", {pollId}, {
        headers: {'x-access-token': localStorage.getItem("token")}
    }).then(res => {
        return res.data.invitation;
    })
}