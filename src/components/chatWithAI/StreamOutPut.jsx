import React, { useState, useEffect } from "react";
import { Input, Button, Space } from "antd";
import streamOutput from "./stream";
import StyledChatContainer, {
  StyledContainer,
  StyledImgContainer,
  StyleImg,
  StyleChatBubbleContainer,
  StyledFooter,
  StyledBubble,
} from "./style";
import { SendOutlined } from "@ant-design/icons";
import aiPic from "../../assets/images/aislogo.png";
import face2 from "../../assets/images/face-female-3.jpg";
import useStore, { addMessage, updateLastMessage } from "../../store/store";

function StreamOutPut() {
  const [value, setValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const msgList = useStore((state) => state.messages);
  useEffect(() => {
    if (isStreaming) {
      const container = document.getElementById("chatContainer");
      container.scrollTop = container.scrollHeight;
    }
  }, [msgList, isStreaming]);

  const handelChange = (e) => {
    setValue(e.target.value);
  };

  const getRes = async (msg) => {
    setIsStreaming(true);
    await streamOutput(msg, (content) => {
      updateLastMessage(content);
    });
    setIsStreaming(false);
  };

  const handelSend = async () => {
    if (value) {
      let userMsg = { role: "user", content: `${value.trim()}` };
      addMessage(userMsg);
      let assistantMsg = { role: "assistant", content: "" };
      addMessage(assistantMsg);
      getRes(value);
      setValue("");
    }
  };
  console.log(msgList);

  const renderMsgList = msgList.map((msg, index) => {
    if (msg.role === "system" || msg.role === "assistant") {
      return (
        <StyleChatBubbleContainer key={index} type="other">
          <StyledImgContainer style={{ marginRight: "10px" }}>
            <StyleImg src={aiPic}></StyleImg>
          </StyledImgContainer>
          <StyledBubble>{msg.content}</StyledBubble>
        </StyleChatBubbleContainer>
      );
    }
    return (
      <StyleChatBubbleContainer key={index} type="mine">
        <StyledBubble>{msg.content}</StyledBubble>
        <StyledImgContainer style={{ marginLeft: "10px" }}>
          <StyleImg src={face2}></StyleImg>
        </StyledImgContainer>
      </StyleChatBubbleContainer>
    );
  });

  return (
    <StyledContainer>
      <StyledChatContainer id="chatContainer">
        {renderMsgList}
      </StyledChatContainer>
      <StyledFooter>
        <Space.Compact style={{ width: "100%" }}>
          <Input.TextArea value={value} onChange={handelChange} autoSize />
          <Button onClick={handelSend}>
            <SendOutlined />
          </Button>
        </Space.Compact>
      </StyledFooter>
    </StyledContainer>
  );
}

export default StreamOutPut;
