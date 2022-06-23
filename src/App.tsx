import React from "react";
import { Reset } from "styled-reset";

import CONSTANTS from "./constants";
import {
  FlexContainer,
  GlobalStyle,
  Header,
  Layout,
} from "./components/Layout";
import ShowCase from "./components/ShowCase";

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
        <ShowCase />
      </Layout>
    </React.Fragment>
  );
}

export default App;
