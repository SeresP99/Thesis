import React, {useState, useMemo} from "react";
import {useTable} from "react-table";
import StyledProfile, {DataDiv, DataParagraph} from "./styles/profilePageStyle"

function ProfilePage() {

    const [profileData, setProfileData] = useState({
        email: "asd",
        password: "asd"
    });

    const COLUMNS = [
        {
            Header: Username,
            accessor: "email"
        },
        {
            Header: Password,
            accessor: "password"
        }
    ]

    const Table = () => {
        const columns = useMemo(() => COLUMNS, []);
        const data = useMemo(() => profileData, []);

        const tableInstance = useTable({
            columns,
            data
        })
    }

    return (
        <StyledProfile>
            <DataDiv>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </DataDiv>
        </StyledProfile>
    );
}

export default ProfilePage;