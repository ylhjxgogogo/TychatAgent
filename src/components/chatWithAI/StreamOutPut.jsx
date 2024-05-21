import React, { useState, useEffect } from "react";
import { Input, Button, Space, Upload } from "antd";
import MDEditor from "@uiw/react-md-editor";
import "../MarkDown/md-dark.css";
import "../MarkDown/md.css";
import streamOutput from "./stream";
import StyledChatContainer, {
  StyledContainer,
  StyledImgContainer,
  StyleImg,
  StyleChatBubbleContainer,
  StyledFooter,
  StyledBubble,
  StyledLabel,
  StyledInput,
} from "./style";
import { SendOutlined, PlusCircleOutlined } from "@ant-design/icons";
import aiPic from "../../assets/images/aislogo.png";
import face2 from "../../assets/images/face-female-3.jpg";
import useStore, { addMessage, updateLastMessage } from "../../store/store";
function StreamOutPut() {
  const [value, setValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const msgList = useStore((state) => state.messages);
  let renderMsgList;
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
      console.log(msgList);
      console.log([...msgList, userMsg]);
      getRes([...msgList, userMsg]);
      setValue("");
    }
  };
  const handelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const md = e.target.result;
      console.log(md);
      addMessage({
        role: "system",
        content: `你是一个善于编写SQL语句的高手，请编写字符串形式的SQL查询语句，用于执行对SQLite中存储的各张表进行查询，并获得表中各类相关信息\n，以下是SQLlite数据库存储的详细情况：\n${md}`,
      });
    };
  };
  renderMsgList = msgList.map((msg, index) => {
    if (msg.role === "assistant") {
      return (
        <StyleChatBubbleContainer key={index} type="other">
          <StyledImgContainer style={{ marginRight: "5px" }}>
            <StyleImg src={aiPic}></StyleImg>
          </StyledImgContainer>
          <StyledBubble>
            {" "}
            <MDEditor.Markdown source={msg.content} className="markdown-body" />
          </StyledBubble>
        </StyleChatBubbleContainer>
      );
    } else if (msg.role === "user") {
      return (
        <StyleChatBubbleContainer key={index} type="mine">
          <StyledBubble>
            {" "}
            <MDEditor.Markdown source={msg.content} className="markdown-body" />
          </StyledBubble>
          <StyledImgContainer style={{ marginLeft: "5px" }}>
            <StyleImg src={face2}></StyleImg>
          </StyledImgContainer>
        </StyleChatBubbleContainer>
      );
    }
  });

  return (
    <StyledContainer>
      <StyledChatContainer id="chatContainer">
        <StyleChatBubbleContainer type="other">
          <StyledImgContainer style={{ marginRight: "10px" }}>
            <StyleImg src={aiPic}></StyleImg>
          </StyledImgContainer>
          <StyledBubble>
            <MDEditor.Markdown
              source="你好，有什么可以帮助你！"
              className="markdown-body"
            />
          </StyledBubble>
        </StyleChatBubbleContainer>
        {renderMsgList}
      </StyledChatContainer>
      <StyledFooter>
        <StyledLabel>
          <PlusCircleOutlined
            style={{ fontSize: "24px", textAlign: "center", color: "#3187ff" }}
          />
          <StyledInput onChange={handelUpload} />
        </StyledLabel>
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
