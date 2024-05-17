import React, { useState } from "react";
import { Input, Button } from "antd";
import { aiTranslate } from "../translator";

function Footer(props) {
  const [inputValue, setInputValue] = useState("");
  const [schema] = useState(() => {
    if (localStorage.getItem("schema")) {
      return localStorage.getItem("schema");
    } else {
      throw new Error("schema 不能为空");
    }
  });
  const [dataSource, setDataSource] = useState(() => {
    if (localStorage.getItem("dataSource")) {
      return JSON.parse(localStorage.getItem("dataSource"));
    } else {
      return [];
    }
  });
  const getTypeName = (schema) => {
    const regex = /interface\s+(\w+)\s+\{/;
    const match = regex.exec(schema);

    if (match) {
      const interfaceName = match[1];
      return interfaceName;
    } else {
      console.log("未找到匹配的接口名称");
    }
  };
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleAdd = async () => {
    // console.log("schema", schema);
    const typename = getTypeName(schema);
    let addSchema = `export interface DataItemArr {
          DataList: Array<${typename}>;
        }`;
    // console.log("tset---", JSON.parse(addSchema));
    let newSchema = addSchema + schema;
    const res = await aiTranslate(env, inputValue, newSchema, "DataItemArr");
    console.log(res);
    res?.DataList.map((dataItem) => {
      // if (dataItem.type === "add") {

      // }
      dataItem.key = crypto.randomUUID();
      dataSource.push(dataItem);
    });
    setDataSource([...dataSource]);
    setInputValue("");
  };
  return (
    <div style={{ display: "flex" }}>
      {" "}
      <Input
        placeholder="请输入记账项"
        value={inputValue}
        onChange={(e) => handleInput(e)}
      />
      <Button onClick={handleAdd}>添加</Button>
    </div>
  );
}

export default Footer;
