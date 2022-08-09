import styled from 'styled-components';
import {Button} from "../styles/Button/Button";


export const InvitePopup = styled(Button)`
  font-family: Courgette, sans-serif;
  border-radius: 5px;
  width: 20%;
  min-width: 125px;
`;

export const CopyButton = styled(Button)`
  font-family: Courgette, sans-serif;
  font-size: 35px;
  width: 30%;
  border-radius: 5px;
  margin: 10px;
`;

export const InvitationInput = styled.input`
  font-family: Montserrat, sans-serif;
  width: 80%;
  height: 30px;
  background-color: #282828;
  color: white;
  border-radius: 5px;
`;

export const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 160px;
  
`;