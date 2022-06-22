import styled from "styled-components";

interface ColorFilterModeProps {
  readonly isActive: boolean;
  readonly position: "left" | "right";
}

const ColorFilterMode = styled.button<ColorFilterModeProps>`
  background-color: ${(props) => (props.isActive ? "#484035" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#484035")};
  cursor: pointer;
  ${(props) => props.position === "left" && "border-radius: 10px 0 0 10px;"}
  ${(props) => props.position === "right" && "border-radius: 0 10px 10px 0;"}

  &[disabled] {
    cursor: default;
    opacity: 0.2;
  }
`;

export default ColorFilterMode;
