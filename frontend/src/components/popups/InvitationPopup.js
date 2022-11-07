import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CreateOption} from "../../assets/API/VoteOptionCrudRequests";
import Popup from "reactjs-popup";
import {AddButton} from "../styles/EditVoteOptionsStyle";
import PopupForm, {
    BackButton,
    ButtonRow,
    MultiLineTextInput,
    PopupSubmitButton,
    TextInput,
    TextInputFieldName
} from "./PopupFormStyle";
import {ToastContainer, toast} from 'react-toastify'
import {CopyButton, InvitationInput, InvitePopup, PopupBody} from "./InvitationPopupStyle";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {GetPollInvitation} from "../../assets/API/PollCrudRequests";

function InvitationPopup(props) {
    require("./PopupModal.css")

    const [invitation, setInvitation] = useState("");
    const [invLink, setInvLink] = useState("");

    const state = useLocation();
    //const {pollId} = state.state;
    const pollId = props.highlightedPoll;


    useEffect(async () => {
        if (pollId !== -1)
            setInvitation(await GetPollInvitation(pollId));
    });

    useEffect(() => {
        setInvLink("http://pollscape.ddns.net:3000/invite/" + invitation);
    }, [invitation]);

    const Toast = () => {
        toast.success("Your invitation link has been copied!\nSend it to your participants!", {position: toast.POSITION.TOP_CENTER});
    }

    return (
        <div>
            <Popup trigger={<InvitePopup disabled={pollId === -1}>Invite</InvitePopup>} modal nested>
                {close => (
                    <div className="small-modal">
                        <button className="closeButton" onClick={close}>
                            &times;
                        </button>

                        <div className="header">Invitation</div>

                        <div className="content">
                            <PopupBody>
                                <InvitationInput type={"text"} value={invLink} readOnly="readonly"/>
                                <CopyToClipboard text={invLink}>
                                    <CopyButton onClick={Toast}>Copy</CopyButton>
                                </CopyToClipboard>
                            </PopupBody>
                        </div>

                    </div>

                )}
            </Popup>
            <ToastContainer theme={'dark'}/>
        </div>
    )
}

export default InvitationPopup;