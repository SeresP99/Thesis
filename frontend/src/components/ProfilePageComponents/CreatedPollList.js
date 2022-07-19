import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {
    ViewPollButton,
    PollListElement,
    PollButtonPanel,
    PollNameTag,
    EditButton,
    ViewDetails,
    BackToDash, ButtonRow, ListUIContainer
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

    const PollListElements = () => {
        try {
            return (pollList.map((poll) => <Poll key={poll.id} title={poll.title} id={poll.id}/>));
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        return (
            <PollListElement onClick={() => setHighlightedPoll(props.id)}
                             style={{backgroundColor: highlightedPoll === props.id ? '#6500AD66' : '#242424'}}>
                <PollNameTag>{props.title}</PollNameTag>
                <PollButtonPanel>
                    <ViewPollButton onClick={() => goToPollDetails(props.id)}>View</ViewPollButton>
                    <EditButton onClick={() => goToVoteOptionsEditor(props.id)}>Edit Vote Options</EditButton>
                </PollButtonPanel>
            </PollListElement>
        )
    }

    return (
        <ListUIContainer>
            <CustomScrollbars style={{borderRadius: '5px', height: 394, marginTop: '10px'}}>
                <PollListElements/>
            </CustomScrollbars>
            <ButtonRow>
                <BackToDash onClick={NavToDash}>Back</BackToDash>
                <ViewDetails onClick={() => goToPollDetails(highlightedPoll)}>View</ViewDetails>
            </ButtonRow>
        </ListUIContainer>
    )
}

export default CreatedPollList;