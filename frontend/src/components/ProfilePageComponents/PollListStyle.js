import styled from 'styled-components';
import {Button} from "../styles/Button/Button";
import {BackButton} from "../styles/Button/BackButton";

export const ListUIContainer = styled.div`
  height: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PollListElement = styled.div`
  width: 98%;
  height: 45px;
  font-size: 20px;
  text-align: left;
  align-items: center;
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 10px;
`;

export const ViewPollButton = styled(Button)`
  background-color: #47ab47;
  border-radius: 5px;
  height: 25px;

  &:focus,
  &:hover {
  }

  &:hover {
    background-color: green;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EditButton = styled(Button)`
  font-family: "Montserrat", sans-serif;
  justify-content: space-evenly;
  font-size: 1em;
  width: 200px;
  height: 25px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: #0066ff;
  color: white;
  margin-left: 5px;

  &:focus,
  &:hover {
    appearance: none;
    --moz-appearance: none;
    --webkit-appearance: none;
    --edge-appearance: none;
    border: none;
    outline: 0;
  }

  &:hover {
    background-color: #0047b2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BackToDash = styled(BackButton)`
  font-size: 40px;
  font-family: Courgette, sans-serif;
  height: 80px;
  border-radius: 5px;
  flex: 1;
  margin-right: 0.5%;
`;

export const ViewDetails = styled(Button)`
  background-color: ${({theme}) => theme.elevation_2};
  font-family: Courgette, sans-serif;
  border-radius: 5px;
  font-size: 40px;
  height: 80px;
  width: 120px;
  flex: 2;
  margin-left: 0.5%;
`;