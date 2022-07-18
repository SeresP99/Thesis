import React, {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import PopupForm, {
    BackButton, ButtonRow,
    PopupSubmitButton,
    MultiLineTextInput,
    TextInput,
    TextInputFieldName, DeleteButton
} from './PopupFormStyle'
import {OptionListElement} from "../styles/EditVoteOptionsStyle";
import {DeleteOption, UpdateOption} from "../../assets/VoteOptionCrudRequests";

function UpdatePopup(props) {

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
        UpdateOption(id, title, description);
        window.location.reload();
    }

    const DeletePollOption = () => {
        DeleteOption(id);
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