import styled from "styled-components";
import {BasicContentCard} from "./PageStyle"
import CustomScrollbars from "../../global/Scrollbar";

export const DashboardCard = styled(BasicContentCard)`
  flex-direction: row;
  
`;

export const ButtonFlexbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: min-content;
  margin-top: -10px;
  margin-left: -15px;
`;

export const Scrollbar = styled.div`
  overflow-y: scroll;
  height: 550px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;