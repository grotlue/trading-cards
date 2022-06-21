import React from "react";
import { Reset } from "styled-reset";

import { GlobalStyle, Header, Layout } from "./Layout";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyle />
      <Layout>
        <Header>Trading Cards</Header>
      </Layout>
    </React.Fragment>
  );
}

export default App;
