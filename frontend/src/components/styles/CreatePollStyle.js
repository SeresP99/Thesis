import styled from "styled-components";
import {BackButton} from "./Button/BackButton"
import {Button} from "./Button/Button";
import {ButtonRow} from "./Button/ButtonRow";

const CreatePollPage = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;


export const CreatePollForm = styled.form`
  width: 90%;
  min-width: 275px;
  height: 475px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormBodyDiv = styled.div`
  background-color: ${({theme}) => theme.elevation_2};
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 407px;
`;

export const InputContainerByType = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const FormTextElement = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 750px;
  margin-bottom: 20px;
`;

export const FormDateElement = styled(FormTextElement)`
  width: 25%;
  max-width: 360px;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;


export const FormSpecialElement = styled.div`
  width: 25%;
  min-width: 260px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextInputFieldName = styled.p`
  font-size: large;
`;

export const DateInputFieldName = styled(TextInputFieldName)`
  margin-right: 10px;
`;

export const MultiLineTextInput = styled.textarea`
  maxlength: 255;
  font-family: "Montserrat", sans-serif;
  font-size: medium;
  box-sizing: border-box;
  width: 81%;
  rows: 3;
  height: 100px;
  border-radius: 3px;
  resize: none;
  margin-bottom: -10px;
`;

export const TextInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-size: large;
  height: 30px;
  width: 80%;
  border-radius: 3px;
  margin-bottom: -10px;
`;

export const CreatePageButtonRow = styled(ButtonRow)`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: none;
`;

export const CreatePollButton = styled(Button)`
  font-family: Courgette, sans-serif;
  background-color: ${({theme}) => theme.elevation_2};
  border-radius: 5px;
  height: 100%;
  flex: 2;
  margin-left: 1%
`;

export const BackToDashButton = styled(BackButton)`
  height: 100%;
  border-radius: 5px;
  font-family: Courgette, sans-serif;
  flex: 1;
  margin-right: 1%
`;

export default CreatePollPage;
