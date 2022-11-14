import {
    CreatePageButtonRow,
    BackToDashButton,
    CreatePollButton,
    CreatePollForm,
    MultiLineTextInput,
    TextInput,
    TextInputFieldName,
    FormTextElement,
    FormBodyDiv,
    FormSpecialElement,
    InputContainerByType,
    FormDateElement,
    DateInputFieldName
} from "../../components/styles/CreatePollStyle";
import {BasicPage, BasicContentCard} from "../../components/styles/Page/PageStyle";
import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import Switch from 'react-switch';
import {PostCreatePoll} from "../../assets/API/PollCrudRequests";
import {ToastContainer, toast} from 'react-toastify'
import '../../components/notification/ToastStyle.css';
import {TitleCard} from "../../components/styles/Page/MenuTitle";

function CreatePoll() {

    require("../../components/datetimepicker/calendar.css");
    require("../../components/datetimepicker/DateTimePicker.css");

    const navigate = useNavigate();

    const [title, onChangeTitle] = useState("");
    const [description, onChangeDescription] = useState("");

    const [openingDateEnabled, onChangeOpeningDateEnabled] = useState(false);
    const [startDate, onChangeStart] = useState();

    const [closureDateEnabled, onChangeClosureDateEnabled] = useState(false);
    const [endDate, onChangeEnd] = useState();

    const [verifiedOnly, onChangeVerifiedOnly] = useState(false);

    const FormSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        if (startDate > endDate) {
            formIsValid = false;
            toast.error("The opening date must be before the closure date.", {position: toast.POSITION.TOP_CENTER});
        }
        if (title === "") {
            formIsValid = false;
            toast.error("Title must not be left empty.", {position: toast.POSITION.TOP_CENTER});
        }
        if (formIsValid) {
            localStorage.setItem("freshPoll", "true");
            const poll = {title, description, startDate, endDate, verifiedOnly};
            const createdId = await PostCreatePoll(poll);
            navigate("/profile/poll/editVoteOptions", {state: {pollId: createdId, freshPoll: true}});
        }
    }

    const BackToDash = () => {
        navigate("/dashboard");
    }

    return (
        <BasicPage>
            <BasicContentCard>
                <TitleCard>Create a Poll</TitleCard>
                <CreatePollForm onSubmit={FormSubmit}>
                    <FormBodyDiv>

                        <InputContainerByType>
                            <FormTextElement>
                                <TextInputFieldName
                                    style={{fontSize: "25px", marginTop: '5px'}}>Title:</TextInputFieldName>
                                <TextInput type="text" onChange={e => onChangeTitle(e.target.value)}
                                           value={title}></TextInput>
                            </FormTextElement>

                            <FormTextElement>
                                <TextInputFieldName>Description:</TextInputFieldName>
                                <MultiLineTextInput onChange={e => onChangeDescription(e.target.value)}
                                                    value={description}></MultiLineTextInput>
                            </FormTextElement>
                        </InputContainerByType>
                        <InputContainerByType>

                            <FormDateElement>
                                <DateInputFieldName>Opening date:</DateInputFieldName>
                                <Switch checked={openingDateEnabled}
                                        onChange={e => {
                                            onChangeOpeningDateEnabled(e);
                                            onChangeStart(undefined)
                                        }}
                                        uncheckedIcon={false} checkedIcon={false} handleDiameter={20}
                                        height={26}/>
                                <DateTimePicker onChange={onChangeStart} value={startDate}
                                                disabled={!openingDateEnabled}></DateTimePicker>
                            </FormDateElement>

                            <FormDateElement>
                                <DateInputFieldName>Closure date:</DateInputFieldName>
                                <Switch checked={closureDateEnabled}
                                        onChange={e => {
                                            onChangeClosureDateEnabled(e);
                                            onChangeEnd(undefined)
                                        }}
                                        uncheckedIcon={false} checkedIcon={false} handleDiameter={20}
                                        height={26}/>
                                <DateTimePicker onChange={onChangeEnd} value={endDate}
                                                disabled={!closureDateEnabled}></DateTimePicker>
                            </FormDateElement>

                        </InputContainerByType>

                        <FormSpecialElement style={{marginBottom: '5px'}}>
                            <TextInputFieldName>Requires Verification:</TextInputFieldName>
                            <div style={{marginTop: -1}}>
                                <Switch onChange={e => onChangeVerifiedOnly(e)} checked={verifiedOnly}
                                        uncheckedIcon={false} checkedIcon={false} handleDiameter={20} height={26}/>
                            </div>
                        </FormSpecialElement>

                    </FormBodyDiv>

                    <CreatePageButtonRow>
                        <BackToDashButton onClick={BackToDash}>Back</BackToDashButton>
                        <CreatePollButton type="submit">Create</CreatePollButton>
                    </CreatePageButtonRow>
                </CreatePollForm>
                <ToastContainer theme="dark"/>
            </BasicContentCard>
        </BasicPage>
    );

}

export default CreatePoll;