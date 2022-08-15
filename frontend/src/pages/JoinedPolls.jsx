import {BasicContentCard, BasicPage} from "../components/styles/Page/PageStyle";
import ParticipatedPollList from "../components/ProfilePageComponents/ParticipatedPollList";

function JoinedPolls() {
    return (
        <BasicPage>
            <BasicContentCard>
                <ParticipatedPollList/>
            </BasicContentCard>
        </BasicPage>
    )
}

export default JoinedPolls;