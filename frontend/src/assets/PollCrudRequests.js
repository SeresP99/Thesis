import Axios from "axios";
import axios from "axios";

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

export function GetAllParticipatingPolls() {
    return Axios.get(backend + "/getParticipatingPolls", {
        headers: {'x-access-token': localStorage.getItem("token")}
    }).then(res => {return res.data.polls})
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

export function GetPollFromInvitation(invitation) {
    return Axios.post(backend + "/getPollFromInvitation", {invitation}, {
        headers: {'x-access-token': localStorage.getItem("token")}
    }).then(res => {
        return {poll: res.data.poll, userIsAuthor: res.data.userIsAuthor};
    })
}

export function RedeemInvitation(invitation) {
    return Axios.post(backend + "/redeemInvitation", {invitation}, {
        headers: {'x-access-token': localStorage.getItem("token")}
    }).then(res => {
        return res.data.success;
    })
}