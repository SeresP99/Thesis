import styled from "styled-components";
import {Button} from "./Button";

export const BackButton = styled(Button)`
  font-family: "Montserrat", sans-serif;
  display: inline;
  font-size: 40px;
  width: 40%;
  max-width: 600px;
  height: 80px;
  background-color: ${({theme}) => theme.back};
  
  &:hover {
    background-color: ${({theme}) => theme.backHover};
  }
`;