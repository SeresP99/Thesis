import {
    BackFromEditingButton,
    ButtonRow,
    FlexboxToScrollThrough, OptionListContainer,
    Scrollbar
} from "../components/styles/EditVoteOptionsStyle";
import CustomScrollbars from "../components/global/Scrollbar"
import Axios from "axios";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CreatePopup from "../components/popups/CreateVoteOptionPopup";
import UpdatePopup from "../components/popups/UpdateVoteOptionPopup";
import {GetOptions} from "../assets/VoteOptionCrudRequests";
import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";


function EditVoteOptions() {

    const navigate = useNavigate();
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

    const NavToDash = () => {
        navigate("/dashboard");
    }

    return (
        <BasicPage>
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
                    <BackFromEditingButton onClick={NavToDash}>Back</BackFromEditingButton>
                    <CreatePopup/>
                </ButtonRow>


            </BasicContentCard>
        </BasicPage>
    );
}

export default EditVoteOptions;