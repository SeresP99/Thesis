import {
    BaseCard,
    ButtonRow,
    GenericPage,
    OptionListElement
} from "../components/styles/EditVoteOptionsStyle";
import CustomScrollbars from "../components/global/Scrollbar"
import Axios from "axios";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CreatePopup from "../components/popups/CreateVoteOptionPopup";
import UpdatePopup from "../components/popups/UpdateVoteOptionPopup";
import {GetOptions} from "../assets/VoteOptionCrudRequests";


function EditVoteOptions() {

    const state = useLocation();
    const {pollId} = state.state;

    const [optionList, setOptionList] = useState([]);

    useEffect(async () => {
        console.log(state.state);
            setOptionList(await GetOptions(pollId));
        },
        []
    );

    function VoteOption(props) {
        return (
            UpdatePopup(props)
        )
    }

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

    return (
        <GenericPage>
            <BaseCard>

                <CustomScrollbars style={scrollStyle}>
                    <div style={divStyle}>
                        {optionList.map((option) => <VoteOption key={option.id} title={option.title} id={option.id}
                                                                description={option.description}/>)}
                    </div>
                </CustomScrollbars>
                <ButtonRow>
                    <CreatePopup/>
                </ButtonRow>


            </BaseCard>
        </GenericPage>
    );
}

export default EditVoteOptions;