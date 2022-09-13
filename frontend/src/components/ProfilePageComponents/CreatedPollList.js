import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {
    PollListElement,
    ViewDetails,
    BackToDash, ButtonRow, Scrollbar, PollListContainer, EditOptions, ScrolledDiv, ElementContainer
} from "./PollListStyle";
import {useNavigate} from "react-router-dom";
import {GetAllCreatedPolls} from "../../assets/PollCrudRequests";
import {BackButton} from "../popups/PopupFormStyle";

const CreatedPollList = () => {

    const navigate = useNavigate();

    const [pollList, setPollList] = useState({});
    const [highlightedPoll, setHighlightedPoll] = useState();

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
                <PollListElement onClick={() => setHighlightedPoll(props.id)}
                                 style={{backgroundColor: highlightedPoll === props.id ? '#6500AD66' : '#242424'}}>
                    {props.title}
                </PollListElement>
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
                <ViewDetails onClick={() => goToPollDetails(highlightedPoll)}>View</ViewDetails>
                <EditOptions onClick={() => goToVoteOptionsEditor(highlightedPoll)}>Edit Options</EditOptions>
            </ButtonRow>
            <ViewDetails style={{width: '100%', margin: '10px'}} onClick={() => NavToStandings(highlightedPoll)}>View
                Standings</ViewDetails>
        </PollListContainer>
    )
}

export default CreatedPollList;