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

export const LockInButton = styled.button`
  font-family: Montserrat, sans-serif;
  width: 30%;
  height: 60px;
  background-color: ${({theme}) => theme.primary};
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
  margin: 1px;
  color: white;
  font-size: 40px;

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

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 80%;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
`;