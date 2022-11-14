import {Route, Routes} from "react-router-dom";
import SignUp from "../pages/account/Signup";
import Login from "../pages/account/Login";
import CreatedPolls from "../pages/polls/CreatedPolls";
import JoinedPolls from "../pages/polls/JoinedPolls";
import ProfilePage from "../pages/account/ProfilePage"
import PollDetails from "../pages/PollDetails";
import CreatePoll from "../pages/polls/CreatePoll";
import EditVoteOptions from "../pages/voteOption/EditVoteOptions";
import Dashboard from "../pages/Dashboard"
import VotePage from "../pages/voteOption/VotePage";
import InvitationAcceptPage from "../pages/polls/InvitationAcceptPage";
import StandingsPage from "../pages/voteOption/StandingsPage";


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
            <Route path="/participate/standings" element={<StandingsPage/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="/create" element={<CreatePoll/>}/>
            <Route path="/invite/:invitation" element={<InvitationAcceptPage/>}/>
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default Views;