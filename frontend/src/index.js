import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {darkTheme} from "./themes";
import GlobalStyle from "./components/styles/GlobalStyles";
import StyledApp from "./components/styles/App.styled";
import {ThemeProvider} from "styled-components";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle/>
                <StyledApp>
                    <App/>
                </StyledApp>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

