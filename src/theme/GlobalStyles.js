import {createGlobalStyle} from "styled-components";

export let GlobalStyles = createGlobalStyle`
  html {
    font-family: 'PT Sans', sans-serif;
    font-size: 16px;
    line-height: 1.3;
    color: ${({color}) => color}
  }
`;
