import styled from "styled-components";
import {BasicContentCard} from "./Page/PageStyle";

export const DataGrid = styled(BasicContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const DataRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const DataColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 400px;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
`;

export const TitleCard = styled(DataColumn)`
  justify-content: center;
  font-family: Courgette, sans-serif;
  align-items: center;
  height: 100px;
  font-size: 40px;
`;

export const TextData = styled.div`
  text-wrap: none;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;