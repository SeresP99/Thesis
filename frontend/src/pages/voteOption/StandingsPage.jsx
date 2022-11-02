import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetOptions} from "../../assets/VoteOptionCrudRequests";
import PollStandingsList from "../../components/ListComponents/PollStandingsList";

function StandingsPage() {

    const state = useLocation();
    const {pollId} = state.state;

    return (
        <BasicPage>
            <BasicContentCard>
                <PollStandingsList/>
            </BasicContentCard>
        </BasicPage>
    )
}

export default StandingsPage;