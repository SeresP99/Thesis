import {BaseCard, GenericPage} from "./styles/BaseCardStyle";
import {DataDiv, DataParagraph, DataGrid, DataRow, DataColumn} from "./styles/profilePageStyle";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";

function PollDetails() {

    const navigate = useNavigate();

    const state = useLocation();
    const {pollId} = state.state;

    const [loginStatus, setLoginStatus] = useState(true);

    const [pollDetails, setPollDetails] = useState([]);

    const GetPollDetails = () => {
        Axios.post("http://localhost:4000/getPollDetails",
            {
                'pollId': pollId
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem("token")
                }
            }).then(res => {
                setPollDetails(res.data.pollDetails);
            }
        )
    }

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
    }, [])

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
    }, []);

    useEffect(() => {
        GetPollDetails(pollId);
    }, [])

    return (
        <GenericPage>
                <DataDiv>
                    <DataGrid>
                        <DataRow>
                            <DataColumn size={3}> {pollDetails.title}</DataColumn>
                        </DataRow>
                        <DataRow>
                            <DataColumn size={2}> Description: </DataColumn>
                            <DataColumn size={3}> {pollDetails.description}</DataColumn>
                        </DataRow>
                    </DataGrid>
                </DataDiv>
        </GenericPage>
    )
}

export default PollDetails;