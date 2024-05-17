import React, { useRef, useState } from "react";
import { Input, Button } from "antd";
import streamOutput from "../stream";
function StreamOutPut(props) {
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const handelChange = (e) => {
    setValue(e.target.value);
  };
  const getRes = async (msg, dom) => {
    const res = await streamOutput(msg, dom);
    return res;
  };
  const handelSend = async () => {
    if (value) {
      console.log("send message", value);
      getRes(value, ref.current); //使用流式输出
      setValue("");
    }
  };
  return (
    <div style={{ width: "80%" }}>
      From User:
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Input value={value} onChange={handelChange} />
        <Button onClick={handelSend}>发送</Button>
      </div>
      From AI:
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "500px",
          padding: "0 20px",
          overflowY: "auto",
          border: "1px solid blue",
        }}
      ></div>
    </div>
  );
}

export default StreamOutPut;
