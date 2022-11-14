import styled from "styled-components";

export const BasicPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const BasicContentCard = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  min-height: 600px;
  height: min-content;
  width: 90%;
  min-width: 380px;
  max-width: 1400px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;