import {Route, Routes} from "react-router-dom";
import SignUp from "../pages/signup";
import LogIn from "../pages/login";
import ProfilePage from "../pages/profilePage"
import PollDetails from "../pages/pollDetails";
import CreatePoll from "../pages/CreatePoll";
import EditVoteOptions from "../pages/EditVoteOptions";
import Dashboard from "../pages/Dashboard"
import VotePage from "../pages/VotePage";


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/poll" element={<PollDetails/>}/>
            <Route path="/profile/poll/editVoteOptions" element={<EditVoteOptions/>}/>
            <Route path="/profile/poll/vote" element={<VotePage/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/create" element={<CreatePoll/>}/>
            <Route path="*" element={<LogIn/>}/>
        </Routes>
    );
};

export default Views;