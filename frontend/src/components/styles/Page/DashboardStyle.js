import styled from "styled-components";
import {BasicContentCard} from "./PageStyle"

export const DashboardCard = styled(BasicContentCard)`
  flex-direction: row;
`;

export const ButtonColumn = styled.div`
  display: flex;
  height: 500px;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;