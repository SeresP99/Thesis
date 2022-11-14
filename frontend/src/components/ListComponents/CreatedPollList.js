import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {
    ListElement,
    ViewDetails,
    BackToDash, ButtonRow, Scrollbar, PollListContainer, EditOptions, ScrolledDiv, ElementContainer
} from "./PollListStyle";
import {useNavigate} from "react-router-dom";
import {GetAllCreatedPolls} from "../../assets/API/PollCrudRequests";
import {BackButton} from "../popups/PopupFormStyle";
import InvitationPopup from "../popups/InvitationPopup";
import {TitleCard} from "../styles/Page/MenuTitle";

const CreatedPollList = () => {

    const navigate = useNavigate();

    const [pollList, setPollList] = useState({});
    const [highlightedPoll, setHighlightedPoll] = useState(-1);

    useEffect(async () => {
        await setPollList(await GetAllCreatedPolls());
    }, [])

    function goToVoteOptionsEditor(key) {
        navigate("/profile/poll/editVoteOptions", {state: {pollId: key}});
    }

    function goToPollDetails(key) {
        navigate("/profile/poll", {state: {pollId: key}})
    }

    const NavToDash = () => {
        navigate('/dashboard');
    }

    function NavToStandings(key) {
        navigate("/participate/standings", {state: {pollId: key}})
    }

    const PollListElements = () => {
        try {
            return (pollList.map((poll) => <Poll key={poll.id} title={poll.title} id={poll.id}/>));
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        return (
            <ElementContainer>
                <ListElement onClick={() => setHighlightedPoll(props.id)}
                             style={{backgroundColor: highlightedPoll === props.id ? '#6500AD66' : '#242424'}}>
                    {props.title}
                </ListElement>
            </ElementContainer>
        )
    }

    return (
        <PollListContainer>
            <Scrollbar>
                <PollListElements/>
            </Scrollbar>
            <ButtonRow>
                <BackToDash onClick={NavToDash}>Back</BackToDash>
                <InvitationPopup highlightedPoll={highlightedPoll}/>
                {/*<ViewDetails onClick={() => goToPollDetails(highlightedPoll)}>View</ViewDetails>*/}
                <EditOptions disabled={highlightedPoll === -1} onClick={() => goToVoteOptionsEditor(highlightedPoll)}>Edit Options</EditOptions>
            </ButtonRow>
            <ViewDetails style={{width: '100%', margin: '10px'}} disabled={highlightedPoll === -1} onClick={() => NavToStandings(highlightedPoll)}>View
                Standings</ViewDetails>
        </PollListContainer>
    )
}

export default CreatedPollList;