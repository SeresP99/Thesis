import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import ParticipatedPollList from "../../components/ListComponents/ParticipatedPollList";
import {TitleCard} from "../../components/styles/Page/MenuTitle";
import React from "react";

function JoinedPolls() {
    return (
        <BasicPage>
            <TitleCard>Polls You Are Part Of</TitleCard>
            <BasicContentCard>
                <ParticipatedPollList/>
            </BasicContentCard>
        </BasicPage>
    )
}

export default JoinedPolls;