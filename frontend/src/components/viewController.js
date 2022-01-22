import { Route, Routes } from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";

const Views = () => {
    return (
        <Routes>
            <Route path="/" element={<LogIn />}/>
            <Route path="/register" element={<SignUp />} />
        </Routes>
    );
};

export default Views;