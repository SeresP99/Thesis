import styled from "styled-components";

export const BaseCard = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  height: 500px;
  width: 90%;
  max-width: 500px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;

export default BaseCard;