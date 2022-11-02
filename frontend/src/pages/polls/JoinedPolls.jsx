import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import ParticipatedPollList from "../../components/ListComponents/ParticipatedPollList";

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