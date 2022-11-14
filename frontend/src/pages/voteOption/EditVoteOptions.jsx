import {
    BackFromEditingButton,
    ButtonRow,
    FlexboxToScrollThrough, OptionListContainer,
    Scrollbar
} from "../../components/styles/EditVoteOptionsStyle";
import CustomScrollbars from "../../components/global/Scrollbar"
import Axios from "axios";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CreatePopup from "../../components/popups/CreateVoteOptionPopup";
import UpdatePopup from "../../components/popups/UpdateVoteOptionPopup";
import {GetOptions} from "../../assets/API/VoteOptionCrudRequests";
import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";
import {CheckIfAuthenticated} from "../../assets/API/loginSessionChecker";
import {toast, ToastContainer} from "react-toastify";
import {TitleCard} from "../../components/styles/Page/MenuTitle";


function EditVoteOptions() {

    const navigate = useNavigate();
    const state = useLocation();
    const {pollId} = state.state;

    const [optionList, setOptionList] = useState([]);

    useEffect(async () => {
            if (!CheckIfAuthenticated)
                navigate("/login");
            if (localStorage.getItem('freshPoll') === "true") {
                toast.success("Your poll has been successfully created. Now start adding options!", {position: toast.POSITION.TOP_CENTER});
                localStorage.removeItem("freshPoll");
            }
            setOptionList(await GetOptions(pollId));
        },
        []
    );

    function VoteOption(props) {
        return (
            UpdatePopup(props)
        )
    }

    const NavToCreatedPolls = () => {
        navigate("/createdPolls");
    }

    return (
        <BasicPage>
            <TitleCard>Edit Votable Options</TitleCard>
            <BasicContentCard>
                <OptionListContainer>
                    <Scrollbar>
                        <FlexboxToScrollThrough>
                            {optionList.map((option) => <VoteOption key={option.id} title={option.title} id={option.id}
                                                                    description={option.description}/>)}
                        </FlexboxToScrollThrough>
                    </Scrollbar>
                </OptionListContainer>

                <ButtonRow>
                    <BackFromEditingButton onClick={NavToCreatedPolls}>Back</BackFromEditingButton>
                    <CreatePopup/>
                </ButtonRow>

                <ToastContainer theme="dark"/>
            </BasicContentCard>
        </BasicPage>
    );
}

export default EditVoteOptions;