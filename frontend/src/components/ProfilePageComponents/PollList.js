import React, {useEffect} from 'react';
import ScrollableList from 'react-scrollable-list';
import {Scrollbars} from "react-custom-scrollbars-2";
import CustomScrollbars from "../global/Scrollbar";
import {AddButton, PollListElement, PollButtonPanel, PollNameTag} from "./PollListStyle";


const PollList = () => {

    let PollList = [];
    /*for (let i = 0; i < 20; i++) {
        PollList.push({id: i, content: i});
    }*/

    function Poll(props) {
        return <PollListElement>
            <PollNameTag>Poll number: {props.content}</PollNameTag>
            <PollButtonPanel>
                <AddButton>Add</AddButton>
            </PollButtonPanel>
        </PollListElement>
    }

    const mainList = PollList.map(poll => <p>{poll}</p>);


    return (
        <div style={{width: '80%'}}>
            <CustomScrollbars style={{borderRadius: '5px', height: 300}}>
                {PollList.map((poll) => <Poll key={poll.id} content={poll.content}/>)}
            </CustomScrollbars>
        </div>
    )
}

export default PollList;