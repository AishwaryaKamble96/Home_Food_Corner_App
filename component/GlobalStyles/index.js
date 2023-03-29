import { createGlobalStyle } from "styled-components";
///import bck from '../../public/img/'
const GlobalStyle = createGlobalStyle`
    *,
  *::before,
  *::after {
        box-sizing: border-box;
    }

    body {
        margin:auto;
        font-family: sans-serif;
      background-color:whitesmoke;
      background: url(/img/backgroundImg4.jpg) no-repeat center center fixed;
      background-size:cover;
     
     
    }
`;

export default GlobalStyle;
