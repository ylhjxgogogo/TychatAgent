import styled from "styled-components";
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100px;
  /* border: 1px solid red; */
`;
const StyledInput = styled.input.attrs({ type: "file" })`
  display: none;
`;
export { StyledLabel, StyledInput };
