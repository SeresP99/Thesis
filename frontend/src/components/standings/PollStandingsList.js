import React, {useEffect, useState} from 'react';
import CustomScrollbars from "../global/Scrollbar";
import {useLocation, useNavigate} from "react-router-dom";
import {GetAllCreatedPolls} from "../../assets/PollCrudRequests";
import {BackButton} from "../popups/PopupFormStyle";
import {
    MyProgressBar,
    StandingsListContainer,
    Scrollbar,
    ElementContainer,
    ListDiv,
    Title, StandingsBackButton
} from "./PollStandingsListStyle";
import {getStandings} from "../../assets/PollCrudRequests";

function PollStandingsList() {

    const navigate = useNavigate();
    const state = useLocation();

    const {pollId} = state.state;
    const [pollOptionList, setPollOptionList] = useState({});
    const [voteCount, setVoteCount] = useState(0);
    const [data, setData] = useState({});

    useEffect(async () => {
        setData(await getStandings(pollId))
    }, []);

    useEffect(async () => {
        try {
            setPollOptionList(data.standings.sort((a, b) => b.vote_count - a.vote_count));
            setVoteCount(data.voteCount);
        } catch (e) {
        }
    }, [data]);


    const NavToParticipate = () => {
        navigate("/joinedPolls");
    }

    const ListElementMapper = () => {
        try {
            return (pollOptionList.map((poll) => <Poll key={poll.id} title={poll.title} voteCount={poll.vote_count}
                                                       id={poll.id} />));
        } catch (e) {
            return null;
        }
    }

    function Poll(props) {
        const counter = props.voteCount / voteCount * 100;

        return (
            <div>
                <ElementContainer>
                    <p style={{
                        position: 'relative',
                        top: '11px',
                        left: '20px',
                        width: '0px',
                        whiteSpace: 'nowrap'
                    }}>{props.title}: {props.voteCount}</p>

                    <MyProgressBar
                        completed={counter}
                        customLabel={" "}
                        animateOnRender={true}
                        baseBgColor="#333333"
                        height={'40px'}>
                        {props.title}
                    </MyProgressBar>
                </ElementContainer>
            </div>
        )
    }

    return (
        <StandingsListContainer>
            <Title>Results</Title>
            <p>Total number of votes: {voteCount}</p>
            <Scrollbar>
                <ListElementMapper/>
            </Scrollbar>
            <StandingsBackButton onClick={NavToParticipate}>Back</StandingsBackButton>
        </StandingsListContainer>
    )
}

export default PollStandingsList;