import styled from "styled-components";

export const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  width: 60px;
  height: 60px;
  border: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  --edge-appearance: none;
  border: none;
  outline: 0;
  background-color: ${({theme}) => theme.primary};
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
    background-color: ${({theme}) => theme.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: rgba(56, 56, 56, 0.35);
    color: rgba(162, 162, 162, 0.66);
  }
`;