import styled from "styled-components";

const ProfilePage = styled.div`

  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DataDiv = styled.div`
  background-color: ${({theme}) => theme.elevation_1};
  border-radius: 5px;
  min-height: 500px;
  width: 90%;
  min-width: 500px;
  max-width: 1400px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({theme}) => theme.shadow};
  text-align: center;
`;

export const DataParagraph = styled.p`
  font-family: "MontSerrat", sans-serif;
  font-size: medium;
`;


export const DataGrid = styled.div`
  height: 100%;
  width: 100%;
`;

export const DataRow = styled.div`
  display: flex;
`;

export const DataColumn = styled.div`
  flex: ${(props) => props.size};
`;


export default ProfilePage;