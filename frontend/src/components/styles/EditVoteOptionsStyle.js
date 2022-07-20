import styled from "styled-components";
import CreatePoll from "../../pages/CreatePoll";
import CreatePopup from "../popups/CreateVoteOptionPopup";
import {Button} from "./Button/Button";
import {BackButton} from "./CreatePollStyle";
import CustomScrollbars from "../global/Scrollbar";

export const OptionListContainer = styled.div`
  width: 80%;
`;

export const Scrollbar = styled(CustomScrollbars)`
  height: 350px;
  width: 100%;
  border-radius: 5px;
`;

export const FlexboxToScrollThrough = styled.div`
  display: flex;
  min-height: min-content;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const OptionListElement = styled(Button)`
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