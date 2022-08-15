import styled from 'styled-components';
import CustomScrollbars from "../global/Scrollbar";
import ProgressBar from "@ramonak/react-progress-bar";

export const StandingsListContainer = styled.div`
  min-width: 270px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: min-content;
`;

export const Scrollbar = styled(CustomScrollbars)`
  border-radius: 5px;
  height: 450px;
  overflow: auto;
  width: 100%;
`;

export const MyProgressBar = styled(ProgressBar)`
  width: 100%;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ElementContainer = styled.div`
  height: 55px;
  display: flex;
  justify-content: flex-start;
  position: relative;
  right: 11px;
`;