import styled from 'styled-components';
import CustomScrollbars from "../global/Scrollbar";
import ProgressBar from "@ramonak/react-progress-bar";

export const StandingsListContainer = styled.div`
  min-width: 270px;
  width: 80%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const Scrollbar = styled(CustomScrollbars)`
  border-radius: 5px;
  height: 400px;
  width: 100%;
`;

export const StandingElement = styled(ProgressBar)`
  width: 90%;
  margin: 10px;
`;