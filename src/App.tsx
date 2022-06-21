import React from "react";
import { Reset } from "styled-reset";

import { GlobalStyle, Header, Layout } from "./components/Layout";
import CardList from "./components/CardList";

function App() {
  return (
    <React.Fragment>
      <Reset />
      <GlobalStyle />
      <Layout>
        <Header>Trading Cards</Header>
        <CardList />
      </Layout>
    </React.Fragment>
  );
}

export default App;
