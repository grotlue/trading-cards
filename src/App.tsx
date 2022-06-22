import React from "react";
import { Reset } from "styled-reset";

import CONSTANTS from "./constants";
import { GlobalStyle, Header, Layout } from "./components/Layout";
import CardShowCase from "./components/CardShowCase";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyle />
      <Layout>
        <Header>{CONSTANTS.APP_TITLE}</Header>
        <CardShowCase />
      </Layout>
    </React.Fragment>
  );
}

export default App;
