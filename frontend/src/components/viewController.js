import {Route, Routes} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import ProfilePage from "./profilePage"
import PollDetails from "./pollDetails";


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile/poll" element={<PollDetails/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="*" element={<LogIn/>}/>
        </Routes>
    );
};

export default Views;