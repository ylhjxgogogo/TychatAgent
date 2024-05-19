// import React from "react";
import { Button, Card, Input, Form, Alert } from "antd";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { SaveOutlined } from "@ant-design/icons";
import "./config.css";
// eslint-disable-next-line react/prop-types
function Config({ setShow }) {
  const [form] = Form.useForm();
  const [config1, setConfig1] = useState(() => {
    return localStorage.getItem("env") ? true : false;
  });
  const [config2, setConfig2] = useState(() => {
    return localStorage.getItem("schema") ? true : false;
  });
  const [envValue, setEnvValue] = useState({
    OPENAI_API_KEY: "",
    OPENAI_MODEL: "",
    OPENAI_ENDPOINT: "",
  });
  const [schema, setSchema] = useState("");
  const handleCodeHandle = (e) => {
    setSchema(e.target.value);
  };
  const handleEnv = (name, e) => {
    setEnvValue({ ...envValue, [name]: e.target.value });
  };
  const handleFormFinish = (values) => {
    console.log("获取到的表单数据是---", values);
    //将env存在本地
    const env = JSON.stringify(values);
    localStorage.setItem("env", env);
    form.resetFields();
  };
  const handleConfig1 = () => {
    form.submit();
    setConfig1(true);
  };
  const handleConfig2 = () => {
    //将用户填写的schema上传到localstorage函数中收集起来
    // console.log(typeof schema);
    if (schema) {
      localStorage.setItem("schema", schema);
      setConfig2(true);
    } else {
      <Alert
        message="Warning"
        description="schema cannot is empty"
        type="warning"
        showIcon
        closable
      />;
    }
  };
  const handleAllConfig = () => {
    if (config1 && config2) {
      setShow(false);
    }
  };

  const exampleShema = `//示例schema
  export interface DataItem{
    //name表示名字，描述文本....
    name:string,
    //描述文本....
    age:number
  }`;
  return (
    <div className="configScroll">
      <h2 style={{ textAlign: "center" }}>配置页面</h2>
      <div style={{ marginBottom: "10px" }}>
        <Card
          title="配置1"
          extra={
            <Button onClick={handleConfig1} value={config1}>
              <SaveOutlined />
            </Button>
          }
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <Form form={form} onFinish={handleFormFinish}>
            <Form.Item
              label="OPENAI_API_KEY"
              name="OPENAI_API_KEY"
              rules={[
                {
                  required: true,
                  message: "Please input your OPENAI_API_KEY!",
                },
              ]}
            >
              <Input.Password
                value={envValue.OPENAI_API_KEY}
                autoComplete={envValue.OPENAI_API_KEY}
                onChange={(e) => handleEnv("OPENAI_API_KEY", e)}
              />
            </Form.Item>
            <Form.Item
              label="OPENAI_MODEL"
              name="OPENAI_MODEL"
              rules={[
                {
                  required: true,
                  message: "Please input your OPENAI_MODEL!",
                },
              ]}
            >
              <Input.Password
                value={envValue.OPENAI_MODEL}
                autoComplete={envValue.OPENAI_MODEL}
                onChange={(e) => handleEnv("OPENAI_MODEL", e)}
              />
            </Form.Item>
            <Form.Item
              label="OPENAI_ENDPOINT"
              name="OPENAI_ENDPOINT"
              rules={[
                {
                  required: true,
                  message: "Please input your OPENAI_ENDPOINT!",
                },
              ]}
            >
              <Input.Password
                value={envValue.OPENAI_ENDPOINT}
                autoComplete={envValue.OPENAI_ENDPOINT}
                onChange={(e) => handleEnv("OPENAI_ENDPOINT", e)}
              />
            </Form.Item>
          </Form>
        </Card>
        <Card
          title="配置2"
          extra={
            <Button onClick={handleConfig2} value={config2}>
              <SaveOutlined />
            </Button>
          }
          style={{ width: "100%" }}
        >
          <Input.TextArea
            placeholder="请输入基于TS的Schema"
            value={schema}
            onChange={handleCodeHandle}
            style={{
              width: "90%",
              height: "100px",
              overflowY: "auto",
              resize: "none",
              border: "1px solid #ccc",
              borderRadius: "10px",
              outline: "none",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
          <div>
            <span>预览：</span>
          </div>
          <SyntaxHighlighter language="typescript">
            {/* {schema}||{exampleShema} */}
            {schema ? schema : exampleShema}
          </SyntaxHighlighter>
        </Card>
        <Button
          type="primary"
          onClick={handleAllConfig}
          style={{
            // marginTop: "20px",
            marginLeft: "50%",
            backgroundColor: "#2d91b3",
            // position: "absolute",
            // right: 0,
            // bottom: 0,
          }}
        >
          保存配置
        </Button>
      </div>
    </div>
  );
}

export default Config;
