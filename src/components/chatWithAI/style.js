import styled from "styled-components";
import { css } from "styled-components";
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StyledChatContainer = styled.div`
  width: 100%;
  max-height: 750px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 15px; /* 添加内边距，使内容和滚动条之间有间距 */
`;
const StyledImgContainer = styled.div`
  width: 46px;
  height: 46px;
`;
const StyleImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;
const typeVariants = {
  mine: css`
    justify-content: flex-end;
  `,
  other: css`
    justify-content: flex-start;
  `,
};
const StyleChatBubbleContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  ${({ type }) => type && typeVariants[type]}
  margin: 20px 0;
`;
const StyledBubble = styled.div`
  padding: 15px 30px;
  box-sizing: border-box;
  max-width: 200px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  z-index: 10;
  background-color: ${({ type }) =>
    type && type === "mine" ? "#ccc" : "#fff"};
  overflow-wrap: break-word; /* 新的推荐使用的属性 */
  overflow-y: auto;
`;
const StyledFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  right: 0;
  z-index: 999;
`;

export default StyledChatContainer;
export {
  StyledImgContainer,
  StyleImg,
  StyleChatBubbleContainer,
  StyledFooter,
  StyledBubble,
  StyledContainer,
};
