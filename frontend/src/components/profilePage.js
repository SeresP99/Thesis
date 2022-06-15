import React, {useEffect, useState} from "react";
import StyledProfile, {DataColumn, DataDiv, DataGrid, DataRow} from "./styles/profilePageStyle"
import {Scrollbars} from "react-custom-scrollbars-2"
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import PollList from "./ProfilePageComponents/PollList"

function ProfilePage() {

    //region Program Logic

    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState(true);

    const [profileData, setProfileData] = useState('');

    const CheckIfAuthenticated = () => {
        Axios.get("http://localhost:4000/checkAuth", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            },
        }).then(
            res => {
                setLoginStatus(res.data.auth);
            })
    }


    useEffect(() => {
            if (localStorage.getItem("token") === undefined)
                navigate('/login');
        }
    );

    //navigate("/login");

    const getAllData = () => {
        Axios.get("http://localhost:4000/getUserProfile", {
            headers: {
                'x-access-token': localStorage.getItem("token"),
            },
        }).then(res => {
                console.log(res.data)
                setProfileData(res.data.profile);
            }
        );
    }


    useEffect(() => {
        CheckIfAuthenticated();
        if (loginStatus === false)
            navigate("/login");
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            CheckIfAuthenticated();
            if (loginStatus === false)
                navigate("/login");
        }, 5000);
        return () => clearInterval(interval);
    },);

    useEffect(() => {
        getAllData();
        console.log(profileData);
    }, []);

    //endregion

    return (
        <StyledProfile>
            <DataDiv>
                <DataGrid>
                    <DataRow>
                        <DataColumn size={1}>Your Username:</DataColumn>
                        <DataColumn size={2}>{profileData.username}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your email:</DataColumn>
                        <DataColumn size={2}>{profileData.email}</DataColumn>
                    </DataRow>
                    <DataRow>
                        <DataColumn size={1}>Your ID:</DataColumn>
                        <DataColumn size={2}>{profileData.id}</DataColumn>
                    </DataRow>
                </DataGrid>
                <PollList/>
            </DataDiv>
        </StyledProfile>
    );
}

export default ProfilePage;