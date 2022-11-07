import {Page, ContentPanel, OptionListElement, ButtonRow, LockInButton} from "../../components/styles/VotePageSyle"
import CustomScrollbars from "../../components/global/Scrollbar";
import Axios from "axios";
import React, {useEffect, useState, useRef, createRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UpdatePopup from "../../components/popups/UpdateVoteOptionPopup";
import {Vote} from "../../assets/API/VoteRequests";
import {GetOptions} from "../../assets/API/VoteOptionCrudRequests";
import {
    ElementContainer,
    PollListContainer,
    ListElement,
    Scrollbar
} from "../../components/ListComponents/PollListStyle";
import {TitleCard} from "../../components/styles/Page/MenuTitle";
import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";

function VotePage() {

    const navigate = useNavigate();

    const state = useLocation();
    const {pollId} = state.state;

    const [optionList, setOptionList] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [errorText, setErrorText] = useState("");

    const GetVoteOptions = async () => {
        setOptionList(await GetOptions(pollId));
    };

    const CastVote = async () => {
        const voteRequest = await Vote(selectedOption, pollId);
        if (voteRequest.success)
            navigate("/participate/standings", {state: {pollId: pollId}})
        else
            setErrorText(voteRequest.message);
    };

    useEffect(() => {
        GetVoteOptions();
    }, []);

    function VoteOption(props) {
        return (
            <ElementContainer>
                <ListElement onClick={() => setSelectedOption(props.id)}
                             style={{backgroundColor: selectedOption === props.id ? '#6500AD66' : '#242424'}}>
                    {props.title}
                </ListElement>
            </ElementContainer>
        )
    }

    if (localStorage.getItem('platform') === "android")
        return null;

    return (
        <BasicPage>
            <TitleCard>Vote</TitleCard>
            <BasicContentCard>
                <PollListContainer>
                    <Scrollbar>
                        {optionList.map((option) => <VoteOption key={option.id} title={option.title} id={option.id}
                                                                description={option.description}/>)}
                    </Scrollbar>
                <ButtonRow>
                    <LockInButton onClick={CastVote} disabled={!selectedOption}>Lock In</LockInButton>
                    <br/>
                    <p>{errorText}</p>
                </ButtonRow>
                </PollListContainer>
            </BasicContentCard>
        </BasicPage>
    )
}

export default VotePage;