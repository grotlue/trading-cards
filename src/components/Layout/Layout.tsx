import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color: #484035;
    font-family: 'Lora', serif;
    font-size: 16px;
    line-height: 160%;
  }
`;

const Layout = styled.div`
  padding: 32px 20px 24px;
`;

const Header = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 130%;
  text-align: center;
`;

export { GlobalStyle, Layout, Header };
