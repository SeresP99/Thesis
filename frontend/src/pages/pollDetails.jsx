import {BasicPage, BasicContentCard} from "../components/styles/Page/PageStyle"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {CheckIfAuthenticated} from "../assets/loginSessionChecker";
import {GetPollDetails, GetPollInvitation} from "../assets/PollCrudRequests";
import {DataColumn, DataGrid, DataRow, TextData, TitleCard} from "../components/styles/PollDetailsStyle";
import InvitationPopup from "../components/popups/InvitationPopup";
import {toast, ToastContainer} from "react-toastify";

function PollDetails() {

    const navigate = useNavigate();


    const state = useLocation();
    const {pollId} = state.state;
    const {selfInvite} = true;

    const [pollDetails, setPollDetails] = useState({});

    useEffect(() => {
       toast.error("Sorry, you can't invite yourself.")
    }, []);

    useEffect(async () => {
        console.log("poll id: " + pollId);
        if (!await CheckIfAuthenticated())
            navigate("/login");
        await setPollDetails(await GetPollDetails(pollId));
        console.log(pollDetails);
    }, [])

    const OpeningDateDisplay = () => {
        if (pollDetails.opening_date === undefined || pollDetails.opening_date === null)
            return "N/A";
        else
            return pollDetails.opening_date.split('T')[0]
    }

    const ClosingDateDisplay = () => {
        if (pollDetails.closure_date === undefined || pollDetails.closure_date === null)
            return "N/A";
        else
            return pollDetails.closure_date.split('T')[0]
    }

    try {
        return (
            <BasicPage>
                <BasicContentCard>
                    <DataGrid>
                        <TitleCard>
                            {pollDetails.title}
                        </TitleCard>
                        <DataRow>
                            <DataColumn>
                                <TextData>
                                    Opens on:
                                </TextData>
                                <TextData>
                                    <OpeningDateDisplay/>
                                </TextData>
                            </DataColumn>
                            <DataColumn>
                                <TextData>
                                    Closes on:
                                </TextData>
                                <TextData>
                                    <ClosingDateDisplay/>
                                </TextData>
                            </DataColumn>
                        </DataRow>
                        <DataRow>asd</DataRow>

                        <InvitationPopup></InvitationPopup>

                    </DataGrid>
                </BasicContentCard>
                <ToastContainer theme={"dark"}/>
            </BasicPage>

        )
    } catch (e) {
        return (
            <BasicPage>
                <BasicContentCard>

                </BasicContentCard>
            </BasicPage>
        )

    }
}

export default PollDetails;