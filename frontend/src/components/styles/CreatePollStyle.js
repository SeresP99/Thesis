import styled from "styled-components";

const CreatePollPage = styled.div`
    height: 100vh;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    `;

export const ElevatedCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: ${({theme}) => theme.elevation_1};
    border-radius: 5px;
    height: 500px;
    min-height: 400px;
    width: 90%;
    min-width: 500px;
    max-width: 1400px
    box-shadow: ${({theme}) => theme.shadow}
    
`;

export const CreatePollForm = styled.form`
    display: flex;
    width: 90%;
    min-width: 400px
    height: 45%;
    min-height: 400px;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    flex-wrap: wrap;
    flex-direction: row;
    `;

export const CreateFormColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    height: 400px;
`;

export const TextInputFieldName = styled.p`
    width: 81%;
    font-size: large;
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
    `
;

export const CreatePollButton = styled.button`
    font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2em;
  width: 80%;
  max-width: 600px;
  height: 25%;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.secondary};
  color: white;
  margin-bottom: 31px;

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

  &:active {
    transform: scale(0.98);
  }
`;

export const BackButton = styled.button`
    font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 2em;
  width: 80%;
  max-width: 600px;
  height: 25%;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.back};
  color: white;
  margin-bottom: 31px;

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

export default CreatePollPage;
