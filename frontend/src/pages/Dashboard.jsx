import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ButtonFlexbox, DashboardCard, Scrollbar} from "../components/styles/Page/DashboardStyle";
import {CheckIfAuthenticated} from "../assets/loginSessionChecker";
import {
    DashboardButton,
    DashboardButtonDescription,
    DashboardButtonTitle
} from "../components/styles/Button/DashboardButton";

function Dashboard() {

    const navigate = useNavigate();

    const NavToCreatePoll = () => {
        navigate("/create");
    };

    const NavToCreatedPolls = () => {
        navigate("/createdPolls");
    };

    const NavToProfile = () => {
        navigate("/profile");
    };

    const NavToParticipate = () => {
        navigate("/joinedPolls");
    };

    const Logout = async () => {
        await localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!CheckIfAuthenticated())
                navigate("/login");
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    console.log("checking platform");
    if(localStorage.getItem("platform") === "android")
        return null;

    return (
        <BasicPage>
            <DashboardCard>
                <Scrollbar backgroundcolor={'transparent'}>
                    <ButtonFlexbox>

                        <DashboardButton onClick={NavToCreatePoll}>
                            <DashboardButtonTitle>
                                <h1>Create</h1>
                            </DashboardButtonTitle>
                            <DashboardButtonDescription>
                                <p>Create your own polls and invite others to participate!</p>
                            </DashboardButtonDescription>
                        </DashboardButton>

                        <DashboardButton onClick={NavToCreatedPolls}>
                            <DashboardButtonTitle>
                                <h1>My Own</h1>
                            </DashboardButtonTitle>
                            <DashboardButtonDescription>
                                <p>Check how your polls are standing or edit them!</p>
                            </DashboardButtonDescription>
                        </DashboardButton>

                        <DashboardButton onClick={NavToProfile}>
                            <DashboardButtonTitle>
                                <h1>Profile</h1>
                            </DashboardButtonTitle>
                            <DashboardButtonDescription>
                                <p>Look over your profile details.</p>
                            </DashboardButtonDescription>
                        </DashboardButton>

                        <DashboardButton onClick={NavToParticipate}>
                            <DashboardButtonTitle>
                                <h1>Participate</h1>
                            </DashboardButtonTitle>
                            <DashboardButtonDescription>
                                <p>Take part in polls and cast your vote!</p>
                            </DashboardButtonDescription>
                        </DashboardButton>

                        <DashboardButton onClick={Logout}>
                            <DashboardButtonTitle>
                                <h1>Log out</h1>
                            </DashboardButtonTitle>
                            <DashboardButtonDescription>
                                <p>Hope to see you again soon!</p>
                            </DashboardButtonDescription>
                        </DashboardButton>


                    </ButtonFlexbox>
                </Scrollbar>
            </DashboardCard>
        </BasicPage>
    )
}

export default Dashboard;