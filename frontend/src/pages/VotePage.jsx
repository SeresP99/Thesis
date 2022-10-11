import {Page, ContentPanel, OptionListElement, ButtonRow, LockInButton} from "../components/styles/VotePageSyle"
import CustomScrollbars from "../components/global/Scrollbar";
import Axios from "axios";
import {useEffect, useState, useRef, createRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UpdatePopup from "../components/popups/UpdateVoteOptionPopup";
import {Vote} from "../assets/VoteRequests";
import {GetOptions} from "../assets/VoteOptionCrudRequests";

function VotePage() {

    const navigate = useNavigate();

    const state = useLocation();
    const {pollId} = state.state;

    const [optionList, setOptionList] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const GetVoteOptions = async () => {
        setOptionList(await GetOptions(pollId));
    };

    const CastVote = async () => {
        const success = await Vote(selectedOption, pollId);
         if(success)
             navigate("/participate/standings", {state: {pollId : pollId}})
    };

    useEffect(() => {
            GetVoteOptions();
        },
        []
    );

    const scrollStyle = {
        borderRadius: '5px',
        height: 320,
        width: "80%",
        minWidth: "300px"
    }

    const divStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignContent: "space-around",
        height: 290
    }

    function VoteOption(props) {
        return (
            <OptionListElement
                style={{backgroundColor: selectedOption === props.id ? '#6500ad' : '#333333'}}
                onClick={() => setSelectedOption(props.id)}>{props.title}</OptionListElement>
        )
    }

    if(localStorage.getItem('platform') === "android")
        return null;

    return (
        <Page>
            <ContentPanel>
                <CustomScrollbars style={scrollStyle}>
                    <div style={divStyle}>
                        {optionList.map((option) => <VoteOption key={option.id} title={option.title} id={option.id}
                                                                description={option.description}/>)}
                    </div>
                </CustomScrollbars>
                <ButtonRow>
                    <LockInButton onClick={CastVote} disabled={!selectedOption}>Lock In</LockInButton>
                </ButtonRow>
            </ContentPanel>
        </Page>
    )
}

export default VotePage;