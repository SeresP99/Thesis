import CreatedPollList, {GetHighlightedPoll} from "../../components/ListComponents/CreatedPollList";
import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../../components/popups/PopupFormStyle";
import {TitleCard} from "../../components/styles/Page/MenuTitle";
import React from "react";

function CreatedPolls() {

    return (
        <BasicPage>
            <TitleCard>Polls Created By You</TitleCard>
            <BasicContentCard>
                <CreatedPollList/>
            </BasicContentCard>
        </BasicPage>
    )

}

export default CreatedPolls;