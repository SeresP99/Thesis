import styled from "styled-components";
import {BasicContentCard} from "./PageStyle"
import CustomScrollbars from "../../global/Scrollbar";

export const DashboardCard = styled(BasicContentCard)`
  flex-direction: row;
`;

export const ButtonFlexbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  min-height: min-content;
  margin-top: -10px;
  margin-left: -15px;
`;

export const Scrollbar = styled(CustomScrollbars)`
  height: 550px;
  width: 100%;
  border-radius: 5px;
`;