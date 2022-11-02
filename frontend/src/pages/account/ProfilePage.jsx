import React, {useEffect, useState} from "react";
import StyledProfile, {
    ButtonDiv,
    DataColumn,
    DataDiv,
    DataGrid,
    DataRow
} from "../../components/styles/profilePageStyle"
import {CheckIfAuthenticated} from "../../assets/loginSessionChecker"
import {useNavigate} from "react-router-dom";
import {getAllUserData} from "../../assets/ProfileDataRequests";
import {BackButton} from "../../components/popups/PopupFormStyle";

function ProfilePage() {

    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
            if (!CheckIfAuthenticated())
                navigate('/login');
        }
    );

    useEffect(async () => {
        setProfileData(await getAllUserData())
    }, []);

    const NavToDash = () => {
        navigate('/dashboard');
    };

    return (
        <StyledProfile>
            <DataDiv>
                <DataGrid>
                    <DataRow>
                        <DataColumn size={1}>Your Username:</DataColumn>
                        <DataColumn size={1}>{profileData.username}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your email:</DataColumn>
                        <DataColumn size={1}>{profileData.email}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your ID:</DataColumn>
                        <DataColumn size={1}>{profileData.id}</DataColumn>
                    </DataRow>
                </DataGrid>
                <ButtonDiv style={{width: "80%"}}>
                    <BackButton onClick={NavToDash}>Back</BackButton>
                    <button style={{background: "red", height: 40, flex: 1}}></button>
                </ButtonDiv>
            </DataDiv>
        </StyledProfile>
    );
}

export default ProfilePage;