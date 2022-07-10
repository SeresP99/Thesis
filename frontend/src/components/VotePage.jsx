import {Page, ContentPanel, OptionListElement, ButtonRow, LockInButton} from "./styles/VotePageSyle"
import CustomScrollbars from "./global/Scrollbar";
import Axios from "axios";
import {useEffect, useState, useRef, createRef} from "react";
import {useLocation} from "react-router-dom";
import UpdatePopup from "./popups/UpdateVoteOptionPopup";

function VotePage() {

    const state = useLocation();
    const {pollId} = state.state;

    const [optionList, setOptionList] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const GetVoteOptions = () => {
        Axios.post("http://localhost:4000/getPollOptions", {"pollId": pollId}, {
            headers:
                {"x-access-token": localStorage.getItem("token")}
        })
            .then(
                res => {
                    setOptionList(res.data.options);
                }
            )
    };

    const Vote = () => {
        const pollOptionId = selectedOption;
        const obj = {pollOptionId, pollId};

        Axios.post("http://localhost:4000/vote", obj, {
            headers:
                {"x-access-token": localStorage.getItem("token")}
        })
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
                    <LockInButton onClick={Vote} disabled={!selectedOption}>Lock In</LockInButton>
                </ButtonRow>
            </ContentPanel>
        </Page>
    )
}

export default VotePage;