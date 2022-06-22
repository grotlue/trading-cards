import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color: #484035;
    font-family: 'Lora', serif;
    font-size: 16px;
    line-height: 160%;
  }

  input, button {
    border: 1px solid #484035;
    color: #484035;
    font-family: 'Roboto', serif;
    font-size: 14px;

    &:focus, &:active {
      outline: 1px solid #484035;
    }
  }

  button {
    cursor: pointer;
    padding: 5px 7px;
  }

`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 20px 24px;
`;

interface FlexBoxProps {
  readonly flex?: number;
  readonly hCenter?: boolean;
  readonly marginBottom?: number;
  readonly marginLeft?: number;
  readonly marginRight?: number;
  readonly marginTop?: number;
  readonly paddingBottom?: number;
  readonly paddingLeft?: number;
  readonly paddingRight?: number;
  readonly paddingTop?: number;
  readonly type: "row" | "column";
  readonly vCenter?: boolean;
  readonly wrapItems?: boolean;
}

const FlexContainer = styled.div<FlexBoxProps>`
  display: flex;
  box-sizing: border-box;
  ${(props) => props.flex && `flex: ${props.flex};`}
  flex-direction: ${(props) => (props.type === "row" ? "column" : "row")};
  ${(props) => props.wrapItems && "flex-wrap: wrap;"}
  ${(props) =>
    props.hCenter &&
    (props.type === "row"
      ? "align-items: center;"
      : "justify-content: center;")};
  ${(props) =>
    props.vCenter &&
    (props.type === "row"
      ? "justify-content: center;"
      : "align-items: center;")};
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop}px;`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight}px;`}
  ${(props) =>
    props.paddingBottom && `padding-bottom: ${props.paddingBottom}px;`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft}px;`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`}
`;

const Header = styled.h1`
  font-size: 64px;
  font-weight: 700;
  line-height: 130%;
  text-align: center;
`;

export { GlobalStyle, FlexContainer, Header, Layout };
