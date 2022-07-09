import styled from "styled-components";

export const Page = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentPanel = styled.div`
  width: 80%;
  min-width: 400px;
  height: 6000px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  box-shadow: ${({theme}) => theme.shadow};
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
  max-width: 1200px;
`;