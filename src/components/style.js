import styled from "styled-components";
const StyledExcel = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  //设置滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
    height: 1px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background-color: #c3c3c3;
  }
`;
export default StyledExcel;
