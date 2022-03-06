import React, {useState} from "react";
import StyledProfile, {DataDiv, DataParagraph, DataGrid, DataRow, DataColumn} from "./styles/profilePageStyle"

function ProfilePage() {

    const [profileData, setProfileData] = useState({
        email: "Sample username",
        password: "Sample password"
    });

    return (
        <StyledProfile>
            <DataDiv>
                <DataGrid>
                    <DataRow>
                        <DataColumn size={2}>asd</DataColumn>
                        <DataColumn size={1}>asd</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size = {1}>asd</DataColumn>
                    </DataRow>
                </DataGrid>
            </DataDiv>
        </StyledProfile>
    );
}

export default ProfilePage;