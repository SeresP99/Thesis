import React, {useEffect, useState} from "react";
import StyledProfile, {
    ButtonDiv,
    CreatePollButton,
    SwitchListButton,
    DataColumn,
    DataDiv,
    DataGrid,
    DataRow
} from "../components/styles/profilePageStyle"
import {Scrollbars} from "react-custom-scrollbars-2"
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import ParticipatedPollList from "../components/ProfilePageComponents/ParticipatedPollList"
import CreatedPollList from "../components/ProfilePageComponents/CreatedPollList";

function ProfilePage() {

    //region Program Logic

    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState(true);

    const [profileData, setProfileData] = useState('');

    const [displayedList, setDisplayedList] = useState(0);
    const [switchButtonText, setSwitchButtonText] = useState("Show Your Own Polls");

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

    const NavToCreatePoll = () => {
        navigate("/create");
    };

    const SwitchList = () => {
        if (displayedList === 0)
            setDisplayedList(1);

        else
            setDisplayedList(0);
    };

    const List = () => {
        if(displayedList === 0) {
            setSwitchButtonText("Created Polls");
            return (<ParticipatedPollList/>);
        }
        else {
            setSwitchButtonText("Joined Polls");
            return (<CreatedPollList/>);
        }
    }

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
                <List/>
                <ButtonDiv style={{width: "80%"}}>
                    <CreatePollButton style={{flex: 1}} onClick={NavToCreatePoll}>Create Poll</CreatePollButton>
                    <SwitchListButton style={{flex: 1}} onClick={SwitchList}>{switchButtonText}</SwitchListButton>
                    <button style={{background: "red", height: 40, flex: 1}}></button>
                </ButtonDiv>
            </DataDiv>
        </StyledProfile>
    );
}

export default ProfilePage;