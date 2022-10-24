import React, {useEffect, useState} from 'react';
import ScrollableList from 'react-scrollable-list';
import {Scrollbars} from "react-custom-scrollbars-2";
import CustomScrollbars from "../global/Scrollbar";
import {
    ViewPollButton,
    PollListElement,
    PollButtonPanel,
    PollNameTag,
    EditButton,
    Scrollbar,
    PollListContainer,
    BackToDash,
    ViewDetails,
    EditOptions,
    ButtonRow,
    ViewStandings,
    PollListElementContainer,
    ScrolledDiv, ElementContainer
} from "./PollListStyle";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {GetAllParticipatingPolls} from "../../assets/PollCrudRequests";

const ParticipatedPollList = () => {

    const navigate = useNavigate();

    const [pollList, setPollList] = useState({});
    const [highlightedPoll, setHighlightedPoll] = useState();
    const [votedOnHighlighted, setVotedOnHighlighted] = useState(false);

    function goToVote(key) {
        navigate("/profile/poll/vote", {state: {pollId: key}});
    }

    const NavToDash = () => {
        navigate('/dashboard');
    }

    function NavToVote(key) {
        console.log("pollId:" + key);
        navigate("/profile/poll/vote", {state: {pollId: key}})
    }

    function NavToStandings(key) {
        navigate("/participate/standings", {state: {pollId: key}})
    }

    useEffect(async () => {
        setPollList(await GetAllParticipatingPolls());
    }, [])

    useEffect(() => {
        console.log(pollList);
    }, [pollList])

    const PollListElements = () => {
        try {
            return pollList.map((poll) => <Poll key={poll.poll_id} title={poll.title} voted={poll.has_voted}
                                                id={poll.poll_id}/>)
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        return (
                <PollListElement onClick={() => {
                    setHighlightedPoll(props.id);
                    setVotedOnHighlighted(props.voted)
                }}
                                 style={{backgroundColor: highlightedPoll === props.id ? '#6500AD66' : '#242424'}}>
                    {props.title}
                </PollListElement>
        )
    }

    return (
        <PollListContainer>
            <Scrollbar>
                    <PollListElements/>
            </Scrollbar>
            <ButtonRow>
                <BackToDash onClick={NavToDash}>Back</BackToDash>
                <ViewDetails disabled={votedOnHighlighted || !highlightedPoll} onClick={() => NavToVote(highlightedPoll)}>Vote</ViewDetails>
            </ButtonRow>
            <ButtonRow>
                <ViewStandings disabled={!highlightedPoll} onClick={() => NavToStandings(highlightedPoll)}>View Standings</ViewStandings>
            </ButtonRow>
            <p style={{visibility: votedOnHighlighted ? "visible" : "hidden", color: "rgba(255,0,0,0.84)"}}>You already
                voted within this topic!</p>
        </PollListContainer>
    )
}

export default ParticipatedPollList;