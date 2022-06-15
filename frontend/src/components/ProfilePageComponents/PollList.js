import React, {useEffect, useState} from 'react';
import ScrollableList from 'react-scrollable-list';
import {Scrollbars} from "react-custom-scrollbars-2";
import CustomScrollbars from "../global/Scrollbar";
import {AddButton, PollListElement, PollButtonPanel, PollNameTag} from "./PollListStyle";
import Axios from "axios";

const PollList = () => {

    const [pollList, setPollList] = useState([]);

    const getPollList = () => {
        Axios.get("http://localhost:4000/getCreatedPolls", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
            ,
        }).then(
            res => {
                setPollList(res.data.polls);
                console.log(res.data.polls);
            })
    }

    useEffect(() => {
        getPollList();
    }, [])


    function Poll(props) {
        return <PollListElement>
            <PollNameTag>{props.title}</PollNameTag>
            <PollButtonPanel>
                <AddButton Key="props.id">Add</AddButton>
            </PollButtonPanel>
        </PollListElement>
    }

    //const mainList = PollList.map(poll => <p>{poll}</p>);


    return (
        <div style={{width: '80%'}}>
            <CustomScrollbars style={{borderRadius: '5px', height: 300}}>
                {pollList.map((poll) => <Poll key={poll.poll_id} title={poll.title}/>)}
            </CustomScrollbars>
        </div>
    )
}

export default PollList;