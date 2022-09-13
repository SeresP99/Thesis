import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {CheckIfAuthenticated} from "../assets/loginSessionChecker";
import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import {BackToDashBoard, Error, JoinButton, TakeToLogin, Title} from "../components/styles/Page/InviteStyle";
import {GetPollFromInvitation, RedeemInvitation} from "../assets/PollCrudRequests";

function InvitationAcceptPage() {

    const navigate = useNavigate();
    const {invitation} = useParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [poll, setPoll] = useState("")

    useEffect(async () => {
        setLoggedIn(await CheckIfAuthenticated());
        const request = await GetPollFromInvitation(invitation);
        if (request.userIsAuthor) {
            const pollId = request.poll.id;
            navigate("/profile/poll", {state: {pollId: pollId, selfInvite: true}})
        } else
            setPoll(request.poll);
    }, [])

    const Join = async () => {
        const success = await RedeemInvitation(invitation);
        if (success) {
            navigate("/profile/poll/vote", {state: {pollId: poll.id}})
        }
        console.log("success: " + success);
    }

    const AskForLogin = () => {
        return (
            <>
                <p>You must be logged in to participate in polls.</p>
                <TakeToLogin onClick={() => {
                    navigate("/login")
                }}>Log In</TakeToLogin>
            </>
        )
    }

    const AcceptInvite = () => {
        if (poll === undefined)
            return (
                <>
                    <Error>Sorry, we can't find that invitation...</Error>
                    <BackToDashBoard>Dashboard</BackToDashBoard>
                </>
            )
        else
            return (
                <>
                    <h2>Poll you're about to join:</h2>
                    <Title>{poll.title}</Title>
                    <p>{poll.description}</p>
                    <JoinButton onClick={() => {
                        Join()
                    }}>Join</JoinButton>
                </>
            );
    }

    return (
        <BasicPage>
            <BasicContentCard>
                {loggedIn ? AcceptInvite() : AskForLogin()}
            </BasicContentCard>
        </BasicPage>
    )
}

export default InvitationAcceptPage;