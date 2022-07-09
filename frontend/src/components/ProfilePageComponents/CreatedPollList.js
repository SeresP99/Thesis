import React, {useEffect, useState} from 'react';
import ScrollableList from 'react-scrollable-list';
import {Scrollbars} from "react-custom-scrollbars-2";
import CustomScrollbars from "../global/Scrollbar";
import {ViewPollButton, PollListElement, PollButtonPanel, PollNameTag, EditButton} from "./PollListStyle";
import Axios from "axios";
import {useNavigate} from "react-router-dom";

const CreatedPollList = () => {

    const navigate = useNavigate();

    const [pollList, setPollList] = useState([]);

    const getPollList = () => {
        Axios.get("http://localhost:4000/getCreatedPolls", {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        }).then(
            res => {
                setPollList(res.data.polls);
            })
    }

    function goToVoteOptionsEditor(key){
        navigate("/profile/poll/editVoteOptions", {state: {pollId: key}});
    }

    function goToPollDetails(key) {
        navigate("/profile/poll", {state: {pollId: key}})
    }

    useEffect(() => {
        getPollList();
    }, [])


    function Poll(props) {
        return <PollListElement>
            <PollNameTag>{props.title}</PollNameTag>
            <PollButtonPanel>
                <ViewPollButton onClick={() => goToPollDetails(props.id)}>View</ViewPollButton>
                <EditButton onClick={() => goToVoteOptionsEditor(props.id)}>Edit Vote Options</EditButton>
            </PollButtonPanel>
        </PollListElement>
    }

    //const mainList = PollList.map(poll => <p>{poll}</p>);


    return (
        <div style={{width: '80%'}}>
            <CustomScrollbars style={{borderRadius: '5px', height: 300}}>
                {pollList.map((poll) => <Poll key={poll.id} title={poll.title} id={poll.id}/>)}
            </CustomScrollbars>
        </div>
    )
}

export default CreatedPollList;