import CreatedPollList from "../components/ProfilePageComponents/CreatedPollList";
import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../components/popups/PopupFormStyle";

function CreatedPolls() {

    const navigate = useNavigate();

    const NavToDash = () => {
        navigate('/dashboard');
    }

    return (
        <BasicPage>
            <BasicContentCard>
                <CreatedPollList/>
                <BackButton onClick={NavToDash}>Back</BackButton>
            </BasicContentCard>
        </BasicPage>
    )

}

export default CreatedPolls;