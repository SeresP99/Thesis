import styled from "styled-components";
import CreatePoll from "../../pages/CreatePoll";
import CreatePopup from "../popups/CreateVoteOptionPopup";
import {Button} from "./Button/Button";
import {BackButton} from "./CreatePollStyle";

export const GenericPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BaseCard = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  height: 500px;
  width: 90%;
  max-width: 1400px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;

export const OptionListElement = styled.button`
  display: flex;
  justify-content: center;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  align-items: center;
  align-content: center;
  text-align: center;
  height: 50px;
  width: 150px;
  border-radius: 5px;
  margin: 1px;
  background-color: #333333;
  color: white;

  &:hover {
    background-color: ${({theme}) => theme.elevation_3};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  width: 80%;
  margin-top: -18px;
  height:60px;
  max-width: 1200px;
`;

export const AddButton = styled(Button)`
  flex: 2;
  margin-left: 0.5%;
  font-family: Courgette, sans-serif;
  justify-content: space-evenly;
  height: 60px;
  font-size: 40px;
  background-color: ${({theme}) => theme.elevation_2};
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 128, 0, 0.4);
  }
`

export const BackFromEditingButton = styled(BackButton)`
  flex: 1;
  margin-right: 0.5%;
  height: 60px;
  font-family: Courgette, sans-serif;
  font-size: 40px;
  border-radius: 5px;
`;

export default BaseCard;