import {Route, Routes} from "react-router-dom";
import SignUp from "../pages/signup";
import Login from "../pages/Login";
import CreatedPolls from "../pages/CreatedPolls";
import JoinedPolls from "../pages/JoinedPolls";
import ProfilePage from "../pages/profilePage"
import PollDetails from "../pages/pollDetails";
import CreatePoll from "../pages/CreatePoll";
import EditVoteOptions from "../pages/EditVoteOptions";
import Dashboard from "../pages/Dashboard"
import VotePage from "../pages/VotePage";
import InvitationAcceptPage from "../pages/InvitationAcceptPage";
import ParticipantPollDetails from "../pages/Participant/ParticipantPollDetails";


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/createdPolls" element={<CreatedPolls/>}/>
            <Route path="/joinedPolls" element={<JoinedPolls/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/poll" element={<PollDetails/>}/>
            <Route path="/profile/poll/editVoteOptions" element={<EditVoteOptions/>}/>
            <Route path="/profile/poll/vote" element={<VotePage/>}/>
            <Route path="/participate/standings" element={<ParticipantPollDetails/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/create" element={<CreatePoll/>}/>
            <Route path="/invite/:invitation" element={<InvitationAcceptPage/>}/>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default Views;