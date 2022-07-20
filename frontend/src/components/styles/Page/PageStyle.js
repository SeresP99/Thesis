import styled from "styled-components";

export const BasicPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BasicContentCard = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  min-height: 300px;
  height: min-content + 3%;
  width: 90%;
  min-width: 250px;
  max-width: 1400px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;