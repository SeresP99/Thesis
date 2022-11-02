import CreatedPollList, {GetHighlightedPoll} from "../../components/ListComponents/CreatedPollList";
import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../../components/popups/PopupFormStyle";

function CreatedPolls() {

    return (
        <BasicPage>
            <BasicContentCard>
                <CreatedPollList/>
            </BasicContentCard>
        </BasicPage>
    )

}

export default CreatedPolls;