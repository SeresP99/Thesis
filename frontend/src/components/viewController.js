import {Route, Routes} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import ProfilePage from "./profilePage"
import PollDetails from "./pollDetails";
import CreatePoll from "./CreatePoll";
import EditVoteOptions from "./EditVoteOptions";


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/poll" element={<PollDetails/>}/>
            <Route path="/profile/poll/editVoteOptions" element={<EditVoteOptions/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/create" element={<CreatePoll/>}></Route>
            <Route path="*" element={<LogIn/>}/>
        </Routes>
    );
};

export default Views;