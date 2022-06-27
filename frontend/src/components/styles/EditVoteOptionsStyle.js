import styled from "styled-components";

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

export const OptionListElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  height: 50px;
  width: 150px;
  border-radius: 5px;
  margin: 1px;
  background-color: #333333;

  &:hover {
    background-color: ${({theme}) => theme.elevation_3};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
`;

export const AddButton = styled.button`
  flex: 1;
  font-family: "Montserrat", sans-serif;
  justify-content: space-evenly;
  height: 40px;
  font-size: 1em;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: #47ab47;
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
    background-color: green;
  }

  &:active {
    transform: scale(0.98);
  }
`

export default BaseCard;