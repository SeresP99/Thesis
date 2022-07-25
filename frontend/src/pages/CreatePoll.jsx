import {
    CreatePageButtonRow,
    BackToDashButton, CreatePollButton,
    CreatePollForm,
    MultiLineTextInput,
    TextInput,
    TextInputFieldName, FormTextElement, FormBodyDiv, FormSpecialElement, InputContainerByType
} from "../components/styles/CreatePollStyle"
import {BasicPage, BasicContentCard} from "../components/styles/Page/PageStyle"
import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import Switch from 'react-switch';

function CreatePoll() {

    require("../components/datetimepicker/calendar.css");
    require("../components/datetimepicker/DateTimePicker.css");

    const navigate = useNavigate();

    const [title, onChangeTitle] = useState("");
    const [description, onChangeDescription] = useState("");
    const [startDate, onChangeStart] = useState();
    const [endDate, onChangeEnd] = useState();
    const [officiality, onChangeOfficiality] = useState(false);

    const FormSubmit = async (e) => {
        e.preventDefault();
        /*const poll = {title, description, startDate, endDate};
        const createdId = await PostCreatePoll(poll);
        navigate("/profile/poll/editVoteOptions", {state: {pollId: createdId}});*/
        console.log("form submitted");
    }

    const BackToDash = () => {
        navigate("/dashboard");
    }

    return (
        <BasicPage>
            <BasicContentCard>
                <CreatePollForm onSubmit={FormSubmit}>
                    <FormBodyDiv>

                        <InputContainerByType>
                            <FormTextElement>
                                <TextInputFieldName style={{fontSize: "25px", marginTop:'5px'}}>Title:</TextInputFieldName>
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

                            <FormTextElement>
                                <TextInputFieldName>Opening date:</TextInputFieldName>
                                <DateTimePicker onChange={onChangeStart} value={startDate}></DateTimePicker>
                            </FormTextElement>

                            <FormTextElement>
                                <TextInputFieldName>Closure date:</TextInputFieldName>
                                <DateTimePicker onChange={onChangeEnd} value={endDate}></DateTimePicker>
                            </FormTextElement>

                        </InputContainerByType>

                        <FormSpecialElement style={{marginBottom: '5px'}}>
                            <TextInputFieldName>Requires Verification:</TextInputFieldName>
                            <div style={{marginTop: -1}}>
                                <Switch onChange={e => onChangeOfficiality(e)} checked={officiality}
                                        uncheckedIcon={false} checkedIcon={false} handleDiameter={20} height={26}/>
                            </div>
                        </FormSpecialElement>

                    </FormBodyDiv>

                    <CreatePageButtonRow>
                        <BackToDashButton onClick={BackToDash}>Back</BackToDashButton>
                        <CreatePollButton type="submit">Create</CreatePollButton>
                    </CreatePageButtonRow>
                </CreatePollForm>
            </BasicContentCard>
        </BasicPage>
    );

}

export default CreatePoll;