import React from "react";

import { FlexContainer } from "../../Layout";
import { CardDetailLabel } from "./style";

interface CardDetailProps {
  label: string;
  value: string;
}

const CardDetail = ({ label, value }: CardDetailProps) => (
  <FlexContainer type="row" paddingLeft={25} paddingRight={25}>
    <FlexContainer type="column">
      <CardDetailLabel>{label}:</CardDetailLabel>
      <p>{value}</p>
    </FlexContainer>
  </FlexContainer>
);

export default CardDetail;
