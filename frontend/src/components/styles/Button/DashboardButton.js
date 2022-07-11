import {Button} from "./Button";
import styled from "styled-components";

export const DashboardButton = styled(Button)`
  text-align: left;
  width: 95%;
  height: 30%;
  padding: 25px;
  background-color: ${({theme}) => theme.elevation_2};

  &:hover {
    background-color: rgba(101, 0, 173, 0.4);
  }
`;

export const DashboardButtonTitle = styled.div`
  font-size: 20px;
  font-family: Courgette, sans-serif;
`;

export const DashboardButtonDescription = styled.div`
  height: 70px;
  display: flex;
  align-items: center;

  & > p {
    color: rgba(255, 255, 255, 0.76);
    font-size: 17px;
  }
`;