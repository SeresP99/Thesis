import React, {useEffect, useState} from "react";
import StyledProfile, {
    ButtonDiv,
    DataColumn,
    DataDiv,
    DataGrid,
    DataRow
} from "../../components/styles/profilePageStyle"
import {CheckIfAuthenticated} from "../../assets/API/loginSessionChecker"
import {useNavigate} from "react-router-dom";
import {getAllUserData} from "../../assets/API/ProfileDataRequests";
import {BackButton} from "../../components/styles/Button/BackButton";
import {BasicContentCard, BasicPage} from "../../components/styles/Page/PageStyle";
import under_construction from "../../assets/pictures/under_construction.png"

function ProfilePage() {

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
            /*if (!CheckIfAuthenticated())
                navigate('/login');*/
        }
    );

    useEffect(async () => {
        setProfileData(await getAllUserData())
    }, []);

    const NavToDash = () => {
        navigate('/dashboard');
    };

    return (
        <BasicPage>
            <BasicContentCard>
                <DataGrid>
                    <DataRow>
                        <DataColumn size={1}>Your Username:</DataColumn>
                        <DataColumn size={1}>{/*profileData.username*/}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your email:</DataColumn>
                        <DataColumn size={1}>{/*profileData.email*/}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your ID:</DataColumn>
                        <DataColumn size={1}>{/*profileData.id*/}</DataColumn>
                    </DataRow>
                </DataGrid>
                <ButtonDiv style={{width: "80%"}}>
                    <BackButton onClick={NavToDash}>Back</BackButton>
                </ButtonDiv>
                {/*http://clipart-library.com/clipart/1467080.htm*/}
                <img src={under_construction} alt={""} width={'90%'} height={'50%'} style={{position: "absolute", top: '22%', maxWidth: 1400}}/>
            </BasicContentCard>
        </BasicPage>
    );
}

export default ProfilePage;