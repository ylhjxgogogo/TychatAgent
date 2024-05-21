import { Input, Button } from "antd";
import { useEffect, useState } from "react";
import { aiTranslate } from "../translator";
import { DataGridPremium, GridToolbar } from "@qvztest/xdgpre";
import StyledExcel from "./style";
function TableAgent() {
  const [inputValue, setInputValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [schema] = useState(() => {
    if (localStorage.getItem("schema")) {
      return localStorage.getItem("schema");
    } else {
      // throw new Error("schema 不能为空");
    }
  });
  const [env] = useState(() => {
    if (localStorage.getItem("env")) {
      return JSON.parse(localStorage.getItem("env"));
    } else {
      // throw new Error("schema 不能为空");
    }
  });
  const [columns, setColumns] = useState([]);
  // let schema = "";
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
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

  const handleAdd = async () => {
    // console.log("schema", schema);
    const typename = getTypeName(schema);
    console.log("typename", typename);
    let addSchema = `export interface DataItemArr {
      DataList: Array<${typename}>;
    }`;
    // console.log("tset---", JSON.parse(addSchema));
    let newSchema = addSchema + schema;
    const res = await aiTranslate(env, inputValue, newSchema, "DataItemArr");
    console.log("返回的res---", res);
    console.log("datalist", res?.DataList);
    let newDataSource = [];
    res?.DataList.map((dataItem) => {
      console.log("dataItem", dataItem);
      const newDataItem = { ...dataItem, id: crypto.randomUUID() }; // 创建一个可变副本，并添加 id 属性
      newDataSource.push(newDataItem);
    });
    localStorage.setItem("dataSource", JSON.stringify(newDataSource));
    setDataSource([...dataSource, ...newDataSource]);
    setInputValue("");
  };
  //保存表格数据
  const handleSave = () => {
    localStorage.setItem("dataSource", JSON.stringify(dataSource));
  };
  useEffect(() => {
    const localDataSource = localStorage.getItem("dataSource");
    if (localDataSource) {
      console.log("xixi 我用的是缓存 数据");
      const dataList = JSON.parse(localDataSource);
      setDataSource(dataList);
    }

    let columnArrSchema = `
    export interface Column {
      //headerName表示每一列的名称,结合用户的语言习惯来确定是中文还是英文
      headerName: string;
      //field应与DataItem中的属性是一致的，用于检索该列的数据
      field: string;
      //dataIndex应与DataItem中的属性是一致的，用于标识唯一的列
      key: string;
    }
    export interface Columns {
      Columns: Array<Column>;
    }`;
    let firstQuestSchema = schema + "\n" + columnArrSchema;
    console.log(firstQuestSchema);
    //去请求ai，得到符合的columns;
    const getColumns = async () => {
      let request =
        "根据用户定义DataItem的schema,来推断Column,最终返回满足Columns schema规范的数组";
      let res = await aiTranslate(env, request, firstQuestSchema, "Columns");
      return res;
    };
    const localColumns = localStorage.getItem("columns");
    if (localColumns) {
      console.log("xixi 我用的是缓存 列");
      let columns = JSON.parse(localColumns);
      setColumns(columns);
    } else {
      getColumns().then((res) => {
        let newColumnArr;
        newColumnArr = res.Columns?.map((column) => {
          column.editable = true;
          return column; // 返回修改后的列对象
        });
        setColumns(newColumnArr);
        console.log("newArr", newColumnArr);

        localStorage.setItem("columns", JSON.stringify(newColumnArr));
      });
    }
  }, [env, schema]);
  //完美匹配--来找到要删除的项，而不是通过id
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid red",
      }}
    >
      <StyledExcel>
        {" "}
        <DataGridPremium
          editMode="row"
          rows={dataSource}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          style={{ padding: 20 }}
          autoHeight
        />
      </StyledExcel>
      <Button
        size="large"
        type="primary"
        style={{
          marginTop: "20px",
          marginLeft: "50%",
        }}
        onClick={handleSave}
      >
        保存
      </Button>
      <div
        style={{
          display: "flex",
          marginTop: "40px",
          padding: "0 40px",
        }}
      >
        {" "}
        <Input
          placeholder="请输入记账项"
          value={inputValue}
          onChange={(e) => handleInput(e)}
        />
        <Button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          添加
        </Button>
      </div>
    </div>
  );
}
export default TableAgent;
