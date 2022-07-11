import CreatePollPage, {
    BackButton,
    CreateFormColumn, CreatePollButton,
    CreatePollForm,
    ElevatedCard, MultiLineTextInput,
    TextInput,
    TextInputFieldName
} from "../components/styles/CreatePollStyle"
import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Axios from 'axios'

function CreatePoll() {

    require("../components/datetimepicker/calendar.css");
    require("../components/datetimepicker/DateTimePicker.css");

    const navigate = useNavigate();

    const [title, onChangeTitle] = useState("");
    const [description, onChangeDescription] = useState("");
    const [startDate, onChangeStart] = useState();
    const [endDate, onChangeEnd] = useState();

    const FormSubmit = (e) => {
        e.preventDefault();
        const obj = {title, description, startDate, endDate};
        Axios.post("http://localhost:4000/createPoll", obj, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
    }

    const BackToProfile = () => {
        navigate("/profile");
    }

    return (
        <CreatePollPage>
            <ElevatedCard>
                <CreatePollForm onSubmit={FormSubmit}>

                    <CreateFormColumn>
                        <TextInputFieldName style={{fontSize: "25px"}}>Title:</TextInputFieldName>
                        <TextInput type="text" onChange={e => onChangeTitle(e.target.value)} value={title}></TextInput>
                        <TextInputFieldName>Description:</TextInputFieldName>
                        <MultiLineTextInput onChange={e => onChangeDescription(e.target.value)} value={description}></MultiLineTextInput>
                        <TextInputFieldName>sample</TextInputFieldName>
                        <TextInput type="text"></TextInput>
                        <BackButton onClick={BackToProfile}>Back</BackButton>
                    </CreateFormColumn>

                    <CreateFormColumn>
                        <DateTimePicker onChange={onChangeStart} value={startDate}></DateTimePicker>
                        <DateTimePicker onChange={onChangeEnd} value={endDate}></DateTimePicker>
                        <TextInput type="text"></TextInput>
                        <TextInput type="text"></TextInput>
                        <CreatePollButton type="submit">Create Poll</CreatePollButton>
                    </CreateFormColumn>

                </CreatePollForm>
            </ElevatedCard>
        </CreatePollPage>
    );

}

export default CreatePoll;