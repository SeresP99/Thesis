import styled from 'styled-components';
import {Button} from "../styles/Button/Button";
import {BackButton} from "../styles/Button/BackButton";
import CustomScrollbars from "../global/Scrollbar";

export const PollListContainer = styled.div`
  min-width: 270px;
  width: 95%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
`;

export const ScrolledDiv = styled.div`
  position: relative;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min-content;
`;

export const Scrollbar = styled.div`
  background-color: ${({theme}) => theme.elevation_2};
  border-radius: 5px;
  height: 500px;
  width: 100%;
  overflow: auto;
`;

export const ElementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;

export const ListElement = styled.div`
  width: 93%;
  height: 45px;
  font-size: 20px;
  text-align: left;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
`

export const PollNameTag = styled.p`
  font-size: 1.1em;
  display: flex;
  justify-content: left;
  width: 50%;
`;

export const PollButtonPanel = styled.div`
  display: inline;
  justify-content: right;
`;

export const ButtonRow = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  margin-top: 10px;
`;

export const BackToDash = styled(BackButton)`
  font-size: 30px;
  font-family: Courgette, sans-serif;
  height: 80px;
  border-radius: 5px;
  flex: 1;
`;

export const ViewDetails = styled(Button)`
  background-color: ${({theme}) => theme.elevation_2};
  font-family: Courgette, sans-serif;
  border-radius: 5px;
  font-size: 40px;
  height: 80px;
  //width: 120px;
  flex: 1;
`;

export const ViewStandings = styled(ViewDetails)`
  font-size: 35px;
`;

export const EditOptions = styled(Button)`
  margin-left: 0.5%;
  margin-right: 0.5%;
  font-family: Courgette, sans-serif;
  height: 80px;
  font-size: 25px;
  border-radius: 5px;
  flex: 1.4;
  background-color: ${({theme}) => theme.elevation_2};

`;