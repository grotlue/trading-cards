import React from "react";

interface CardDetailProps {
  label: string;
  value: string;
}
import { FlexContainer } from "../../../Layout";

import { CardDetailLabel } from "../StyledCard";

const CardDetail = ({ label, value }: CardDetailProps) => (
  <FlexContainer type="row" paddingLeft={25} paddingRight={25}>
    <FlexContainer type="column">
      <CardDetailLabel>{label}:</CardDetailLabel>
      <p>{value}</p>
    </FlexContainer>
  </FlexContainer>
);

export default CardDetail;
