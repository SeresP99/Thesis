import styled from 'styled-components';

const PopupForm = styled.form`
  height: 350px;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
`;

export const TextInputFieldName = styled.p`
  width: 81%;
  font-size: large;
`;

export const MultiLineTextInput = styled.textarea`
  max-lines: 3;
  font-family: "Montserrat", sans-serif;
  font-size: medium;
  box-sizing: border-box;
  width: 81%;
  height: 100px;
  border-radius: 3px;
  margin-bottom: 30px;
  resize: none;
`;

export const TextInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-size: large;
  height: 30px;
  width: 80%;
  border-radius: 3px;
  margin-bottom: 30px;
`;

export const PopupSubmitButton = styled.button`
  font-family: "Montserrat", sans-serif;
  display: inline;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2em;
  width: 40%;
  flex: 1;
  max-width: 600px;
  height: 80px;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.secondary};
  color: white;

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
    background-color: ${({theme}) => theme.secondaryHover};
  }

  &:disabled {
    background-color: #808080;
    color: #a2a2a2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BackButton = styled.button`
  font-family: "Montserrat", sans-serif;
  display: inline;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2em;
  width: 40%;
  flex: 1;
  max-width: 600px;
  height: 80px;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.back};
  color: white;

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
    background-color: ${({theme}) => theme.backHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DeleteButton = styled.button`
  font-family: "Montserrat", sans-serif;
  display: inline;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2em;
  width: 40%;
  flex: 1;
  max-width: 600px;
  height: 80px;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: #00c8c8;
  color: white;

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
    background-color: ${({theme}) => theme.backHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  
`;

export default PopupForm;