import styled from "styled-components";
import CreatePoll from "../../pages/polls/CreatePoll";
import CreatePopup from "../popups/CreateVoteOptionPopup";
import {Button} from "./Button/Button";
import {BackButton} from "./Button/BackButton";
import CustomScrollbars from "../global/Scrollbar";

export const OptionListContainer = styled.div`
  width: 95%;
  height: 100%;
  margin: 15px 10px 10px 10px;
`;

export const Scrollbar = styled.div`
  overflow: auto;
  height: 500px;
  width: 100%;
  border-radius: 5px;
  background-color: ${({theme}) => theme.elevation_2};
`;

export const FlexboxToScrollThrough = styled.div`
  display: flex;
  position: relative;
  right: 10px;
  min-height: min-content;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

export const OptionListElement = styled(Button)`
  min-height: 50px;
  height: fit-content;
  min-width: 150px;
  width: fit-content;
  font-size: 30px;
  border-radius: 5px;
  margin: 10px 10px 10px 22px;
  background-color: #333333;
  color: white;

  &:hover {
    background-color: ${({theme}) => theme.elevation_3};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 80%;
  height: min-content;
  max-width: 1200px;
  margin-bottom: 10px;
`;

export const AddButton = styled(Button)`
  flex: 2;
  min-width: 212px;
  margin: 3px;
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
  margin: 3px;
  height: 60px;
  font-family: Courgette, sans-serif;
  font-size: 40px;
  border-radius: 5px;
`;