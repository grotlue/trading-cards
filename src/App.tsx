import React from "react";
import { Reset } from "styled-reset";

import CONSTANTS from "./constants";
import {
  FlexContainer,
  GlobalStyle,
  Header,
  Layout,
} from "./components/Layout";
import CardShowCase from "./components/CardShowCase";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyle />
      <Layout>
        <FlexContainer type="row" hCenter>
          <FlexContainer type="column" marginBottom={35}>
            <Header>{CONSTANTS.APP_TITLE}</Header>
          </FlexContainer>
        </FlexContainer>
        <CardShowCase />
      </Layout>
    </React.Fragment>
  );
}

export default App;
