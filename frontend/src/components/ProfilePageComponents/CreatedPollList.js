import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {ViewPollButton, PollListElement, PollButtonPanel, PollNameTag, EditButton} from "./PollListStyle";
import {useNavigate} from "react-router-dom";
import {GetAllCreatedPolls} from "../../assets/PollCrudRequests";

const CreatedPollList = () => {

    const navigate = useNavigate();

    const [pollList, setPollList] = useState({});

    useEffect(async () => {
        await setPollList(await GetAllCreatedPolls());
    }, [])

    function goToVoteOptionsEditor(key) {
        navigate("/profile/poll/editVoteOptions", {state: {pollId: key}});
    }

    function goToPollDetails(key) {
        navigate("/profile/poll", {state: {pollId: key}})
    }

    const PollListElements = () => {
        try {
            return (pollList.map((poll) => <Poll key={poll.id} title={poll.title} id={poll.id}/>));
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        return <PollListElement>
            <PollNameTag>{props.title}</PollNameTag>
            <PollButtonPanel>
                <ViewPollButton onClick={() => goToPollDetails(props.id)}>View</ViewPollButton>
                <EditButton onClick={() => goToVoteOptionsEditor(props.id)}>Edit Vote Options</EditButton>
            </PollButtonPanel>
        </PollListElement>
    }

    return (
        <div style={{width: '80%'}}>
            <CustomScrollbars style={{borderRadius: '5px', height: 400}}>
                <PollListElements/>
            </CustomScrollbars>
        </div>
    )
}

export default CreatedPollList;