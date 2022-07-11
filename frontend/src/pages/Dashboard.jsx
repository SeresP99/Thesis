import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    DashboardButton,
    DashboardButtonDescription,
    DashboardButtonTitle
} from "../components/styles/Button/DashboardButton";
import {ButtonColumn, DashboardCard} from "../components/styles/Page/DashboardStyle";
import {CheckIfAuthenticated} from "../assets/loginSessionChecker";

function Dashboard() {

    const navigate = useNavigate();

    const NavToCreatePoll = () => {
        navigate("/create")
    };

    const NavToProfile = () => {
        navigate("/profile")
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!CheckIfAuthenticated())
                navigate("/login");
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <BasicPage>
            <DashboardCard>
                <ButtonColumn>

                    <DashboardButton onClick={NavToCreatePoll}>
                        <DashboardButtonTitle>
                            <h1>Create</h1>
                        </DashboardButtonTitle>
                        <DashboardButtonDescription>
                            <p>Create your own polls and invite others to participate!</p>
                        </DashboardButtonDescription>
                    </DashboardButton>

                    <DashboardButton>
                        <DashboardButtonTitle>
                            <h1>View My Own</h1>
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

                </ButtonColumn>
                <ButtonColumn>
                    <DashboardButton></DashboardButton>
                    <DashboardButton></DashboardButton>
                </ButtonColumn>
            </DashboardCard>
        </BasicPage>
    )
}

export default Dashboard;