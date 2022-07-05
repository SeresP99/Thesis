import styled from 'styled-components';

export const PollListElement = styled.div`
  height: 30px;
  text-align: left;
  align-items: center;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${({theme}) => theme.elevation_3};
  }
`

export const PollNameTag = styled.p`
  font-size: 1.1em;
  display: flex;
  justify-content: left;
  width: 50%;
`;

export const PollButtonPanel= styled.div`
  display: inline;
  justify-content: right;
`;

export const ViewPollButton = styled.button`
  font-family: "Montserrat", sans-serif;
  justify-content: space-evenly;
  font-size: 1em;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: #47ab47;
  color: white;

  &:focus,
  &:hover {
    appearance: none;
    --moz-appearance: none;
    --webkit-appearance: none;
    --edge-appearance: none;
    border: none;
    outline: 0;
  }

  &:hover {
    background-color: green;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EditButton = styled.button`
  font-family: "Montserrat", sans-serif;
  justify-content: space-evenly;
  font-size: 1em;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: #0066ff;
  color: white;
  margin-left: 5px;

  &:focus,
  &:hover {
    appearance: none;
    --moz-appearance: none;
    --webkit-appearance: none;
    --edge-appearance: none;
    border: none;
    outline: 0;
  }

  &:hover {
    background-color: #0047b2;
  }

  &:active {
    transform: scale(0.98);
  }
`;