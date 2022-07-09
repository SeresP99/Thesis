import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import CreatePoll from "../CreatePoll";
import PopupForm, {
    BackButton, ButtonRow,
    PopupSubmitButton,
    MultiLineTextInput,
    TextInput,
    TextInputFieldName
} from './PopupFormStyle'
import {AddButton} from "../styles/EditVoteOptionsStyle";
import Axios from "axios";
import {useLocation} from "react-router-dom";

function CreatePopup() {

    require("./PopupModal.css")

    const state = useLocation();
    const {pollId} = state.state;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (title === "")
            setIsFormValid(false);
        else
            setIsFormValid(true);
    }, [title])

    const FormSubmit = (e) => {
        e.preventDefault();
        const obj = {title, description, pollId};
        Axios.post("http://localhost:4000/addPollOption", obj, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        window.location.reload();
    }

    return (
        <Popup trigger={<AddButton>+</AddButton>} modal nested>
            {close => (
                <div className="modal">

                    <button className="closeButton" onClick={close}>
                        &times;
                    </button>

                    <div className="header"> Create an option to vote on</div>

                    <div className="content">
                        <PopupForm onSubmit={FormSubmit}>
                            <TextInputFieldName>Title:</TextInputFieldName>
                            <TextInput onChange={e => setTitle(e.target.value)}></TextInput>
                            <TextInputFieldName>Description:</TextInputFieldName>
                            <MultiLineTextInput onChange={e => setDescription(e.target.value)}></MultiLineTextInput>
                            <ButtonRow>
                                <BackButton onClick={() => {
                                    console.log('modal closed ');
                                    close();
                                }}>Back</BackButton>
                                <PopupSubmitButton type="submit" disabled={!isFormValid}>Create Option</PopupSubmitButton>
                            </ButtonRow>
                        </PopupForm>
                    </div>
                    {/*<div className="actions" style={{visibility: 'hidden'}}>
                        <button
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            close modal
                        </button>
                    </div>*/}
                </div>
            )}
        </Popup>
    )
}

export default CreatePopup