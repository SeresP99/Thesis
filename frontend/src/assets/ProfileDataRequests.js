import Axios from "axios";

const backend = process.env.REACT_APP_SERVER + "/profile";

export function getAllUserData() {
    return Axios.get(backend+ "/getUserProfile", {
        headers: {
            'x-access-token': localStorage.getItem("token"),
        },
    }).then(res => {
            return res.data.profile;
        }
    );
}