import styled from "styled-components";
import {Button} from "../Button/Button";

export const TakeToLogin = styled(Button)`
  width: 50%;
  border-radius: 5px;
  background-color: ${({theme}) => theme.elevation_2};
  font-family: Courgette, sans-serif;
  margin-top: 40px;
`;

export const BackToDashBoard = styled(TakeToLogin)``;

export const JoinButton = styled(TakeToLogin)`
    font-size: 70px;
  height: fit-content;
  padding: 10px;
`;

export const Title = styled.p`
  font-family: Courgette, sans-serif;
  font-size: 40px;
`;

export const Error = styled(Title)`
font-size: 30px;
`;