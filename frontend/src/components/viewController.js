import {Route, Routes} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import ProfilePage from "./profilePage"


const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/register" element={<SignUp/>}/>
            <Route path="*" element={<LogIn/>}/>
        </Routes>
    );
};

export default Views;