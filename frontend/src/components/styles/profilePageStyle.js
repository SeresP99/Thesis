import styled from "styled-components";

const ProfilePage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DataDiv = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  min-height: 500px;
  width: 90%;
  min-width: 500px;
  max-width: 1400px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;

export const DataParagraph = styled.p`
  font-family: "MontSerrat", sans-serif;
  font-size: medium;
`;


export const DataGrid = styled.div`
  height: 100%;
  width: 100%;
  
`;

export const DataRow = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 25px;
`;

export const DataColumn = styled.div`
  flex: ${(props) => props.size};
`;

export const ButtonDiv = styled.div`
    display: flex;
    
`;

export const CreatePollButton = styled.button`
    font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.5em;
  width: 80%;
  max-width: 600px;
  height: 60px;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.primary};
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
    background-color: ${({theme}) => theme.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SwitchListButton = styled.button`
    font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.5em;
  width: 80%;
  max-width: 600px;
  height: 60px;
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

export default ProfilePage;