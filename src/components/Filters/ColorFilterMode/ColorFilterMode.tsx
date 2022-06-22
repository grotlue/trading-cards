import styled from "styled-components";

interface ColorFilterModeProps {
  readonly isActive: boolean;
  readonly position: "left" | "right";
}

const ColorFilterMode = styled.button<ColorFilterModeProps>`
  background-color: ${(props) => (props.isActive ? "#484035" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#484035")};
  ${(props) => props.position === "left" && "border-radius: 15px 0 0 15px;"}
  ${(props) => props.position === "right" && "border-radius: 0 15px 15px 0;"}

  &[disabled] {
    cursor: default;
    opacity: 0.2;
  }
`;

export default ColorFilterMode;
