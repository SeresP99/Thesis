import React from 'react';
import ScrollableList from 'react-scrollable-list';
import {Scrollbars} from "react-custom-scrollbars-2";
import CustomScrollbars from "../global/Scrollbar";

const PollList = () => {

    let PollList = [];
    for (let i = 0; i < 20; i++) {
        PollList.push({id: i, content: i});
    }

    function Poll(props) {
        return <li>Poll number: {props.content}</li>
    }

    const mainList = PollList.map(poll => <p>{poll}</p>);

    return (
        <div>
            <CustomScrollbars style={{borderRadius: '5px', width: 500, height: 300}}>
                <ul>
                    {PollList.map((poll) => <Poll key={poll.id} content={poll.content}/>)}
                </ul>
            </CustomScrollbars>
        </div>
    )
}

export default PollList;