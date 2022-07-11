import styled from "styled-components";
import {Button} from "./Button";

export const BackButton = styled(Button)`
  font-family: "Montserrat", sans-serif;
  display: inline;
  font-size: 2em;
  width: 40%;
  max-width: 600px;
  height: 80px;

  &:hover {
    background-color: ${({theme}) => theme.backHover};
  }
`;