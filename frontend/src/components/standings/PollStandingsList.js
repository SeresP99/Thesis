import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {useLocation, useNavigate} from "react-router-dom";
import {GetAllCreatedPolls} from "../../assets/PollCrudRequests";
import {BackButton} from "../popups/PopupFormStyle";
import {StandingElement, StandingsListContainer, Scrollbar} from "./PollStandingsListStyle";
import {getStandings} from "../../assets/VoteOptionCrudRequests";

const PollStandingsList = () => {

    const navigate = useNavigate();
    const state = useLocation();

    const {pollId} = state.state;
    const [pollOptionList, setPollOptionList] = useState({});
    const [voteCount, setVoteCount] = useState(0);
    const [data, setData] = useState({});

    useEffect(async () => {
        setData(await getStandings(pollId))
    }, []);

    useEffect(() => {
        setPollOptionList(data.standings);
        setVoteCount(data.voteCount);
    }, [data]);

    const ListElementMapper = () => {
        try {
            return (pollOptionList.map((poll) => <Poll key={poll.id} title={poll.title} voteCount={poll.vote_count}
                                                       id={poll.id}/>));
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        // console.log(voteCount);
        // console.log(props.voteCount);
        const counter = props.voteCount / voteCount * 100;
        return <StandingElement
            completed={counter}
            customLabel={props.voteCount}
            animateOnRender={true}
            baseBgColor="#333333"
            height={'40px'}>
            {props.title}
        </StandingElement>
    }

    return (
        <StandingsListContainer>
            <p>Number of votes: {voteCount}</p>
            <Scrollbar>
                <ListElementMapper/>
            </Scrollbar>
        </StandingsListContainer>
    )
}

export default PollStandingsList;