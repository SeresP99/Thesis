import styled from "styled-components";

const Signup = styled.div`

  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > form {
    background-color: ${({theme}) => theme.elevation_1};
    border-radius: 5px;
    height: 500px;
    width: 90%;
    max-width: 500px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    box-shadow: ${({theme}) => theme.shadow};
    text-align: center;

    h1 {
      font-family: "Pacifico", cursive;
    }

  }
`;

export const TextInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-size: large;
  height: 30%;
  width: 300px;
  margin-bottom: 10px;
  border-radius: 3px;
`;

export const SignupButton = styled.button`
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.3rem;
  width: 90%;
  max-width: 300px;
  height: 15%;
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
`;

export default Signup;