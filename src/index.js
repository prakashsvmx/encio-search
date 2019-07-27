import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "theme/GlobalStyles";
import {appThemeBase} from 'theme/index';
import {Provider} from 'react-redux';
import makeStore from 'store/store';

const store = makeStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={appThemeBase}>

            <>
                <GlobalStyles color="#444"/>
                <App/>
            </>

        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
