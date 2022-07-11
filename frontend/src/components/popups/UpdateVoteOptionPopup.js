import React, {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import CreatePoll from "../../pages/CreatePoll";
import PopupForm, {
    BackButton, ButtonRow,
    PopupSubmitButton,
    MultiLineTextInput,
    TextInput,
    TextInputFieldName, DeleteButton
} from './PopupFormStyle'
import {AddButton, OptionListElement} from "../styles/EditVoteOptionsStyle";
import Axios from "axios";
import {useLocation} from "react-router-dom";
import axios from "axios";

function UpdatePopup(props) {

    //require("./PopupModal.css")

    const state = useLocation();
    const {pollId} = state.state;

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [formChanged, setFormChanged] = useState(false);
    const id = props.id;

    useEffect(() => {
        if (title === props.title && description === props.description)
            setFormChanged(false);
        else
            setFormChanged(true);
    }, [title, description])

    const FormSubmit = (e) => {
        e.preventDefault();
        const obj = {id, title, description};
        console.log(obj);
        Axios.post("http://localhost:4000/updatePollOption", obj, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        window.location.reload();
    }

    const DeletePollOption = () => {
        const obj = {id};
        Axios.post("http://localhost:4000/deletePollOption", obj, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        });
        window.location.reload();
    }

    return (
        <Popup trigger={<OptionListElement>{props.title}</OptionListElement>} modal nested>
            {close => (
                <div className="modal">

                    <button className="closeButton" onClick={close}>
                        &times;
                    </button>

                    <div className="header">Edit Voting Option</div>

                    <div className="content">
                        <PopupForm onSubmit={FormSubmit}>
                            <TextInputFieldName>Title:</TextInputFieldName>
                            <TextInput onChange={(e) => setTitle(e.target.value)} value={title}></TextInput>
                            <TextInputFieldName>Description:</TextInputFieldName>
                            <MultiLineTextInput onChange={(e) => setDescription(e.target.value)}
                                                value={description}></MultiLineTextInput>
                            <ButtonRow>
                                <BackButton onClick={() => close}>Back</BackButton>
                                <DeleteButton onClick={() => DeletePollOption()}>Delete</DeleteButton>
                                <PopupSubmitButton type="submit" disabled={!formChanged}>Save</PopupSubmitButton>
                            </ButtonRow>
                        </PopupForm>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default UpdatePopup