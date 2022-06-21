import CreatePollPage, {
    BackButton,
    CreateFormColumn, CreatePollButton,
    CreatePollForm,
    ElevatedCard, MultiLineTextInput,
    TextInput,
    TextInputFieldName
} from "./styles/CreatePollStyle"
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function CreatePoll() {

    const navigate = useNavigate();

    const [startDate, onChangeStart] = useState();
    const [endDate, onChangeEnd] = useState();

    const BackToProfile = () => {
        navigate("/profile");
    }

    return (
        <CreatePollPage>
            <ElevatedCard>
                <CreatePollForm>

                    <CreateFormColumn>
                        <TextInputFieldName style={{fontSize: "25px"}}>Title:</TextInputFieldName>
                        <TextInput type="text"></TextInput>
                        <TextInputFieldName>Description:</TextInputFieldName>
                        <MultiLineTextInput></MultiLineTextInput>
                        <TextInputFieldName>sample</TextInputFieldName>
                        <TextInput type="text"></TextInput>
                        <BackButton onClick={BackToProfile}>🠔 Back</BackButton>
                    </CreateFormColumn>

                    <CreateFormColumn>
                        <DateTimePicker onChange={onChangeStart} value={startDate}></DateTimePicker>
                        <DateTimePicker onChange={onChangeEnd} value={endDate}></DateTimePicker>
                        <TextInput type="text"></TextInput>
                        <TextInput type="text"></TextInput>
                        <CreatePollButton type="submit"> Create Poll</CreatePollButton>
                    </CreateFormColumn>

                </CreatePollForm>
            </ElevatedCard>
        </CreatePollPage>
    );

}

export default CreatePoll;