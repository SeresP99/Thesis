import {createGlobalStyle} from "styled-components";
const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
}

// Scrollbar
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #6500AD #C2C2C2;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #6500AD;
}


body {
  color: ${({theme}) => theme.text};
  margin: 0;
  background-color: ${({theme}) => theme.body};
  font-family: -apple-system, BlinkMacSystemFont, 'Montserrat', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;

export default GlobalStyle;