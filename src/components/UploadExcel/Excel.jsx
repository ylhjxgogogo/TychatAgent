import React, { useState } from "react";
import * as XLSX from "xlsx";
import { DataGridPremium, GridToolbar } from "@qvztest/xdgpre";
import StyledExcel from "../style";
import { StyledLabel, StyledInput } from "./style";
import { InboxOutlined } from "@ant-design/icons";
function Excel(props) {
  const [data, setData] = useState({ columns: [], rows: [] });
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const value = e.target.result;
      const workbook = XLSX.read(value, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const column = data[0];
      //data[0]表示列名
      //每一列都映射成{headerName: "交易时间", field: "transactionTime", key: "transactionTime", editable: true}；
      const columnData = column.map((colName) => {
        return {
          headerName: colName,
          headerClassName: "super-app-theme--header",
          field: colName,
          key: colName,
          editable: true,
        };
      });
      // 将数据转换为对象数组
      const formattedData = data.slice(1).map((row, rowId) => {
        const rowData = {};
        column.forEach((column, index) => {
          if (!column["id"]) {
            rowData["id"] = rowId;
          }
          rowData[column] = row[index];
        });
        return rowData;
      });
      setData({
        rows: formattedData,
        columns: columnData,
      });
    };
  };
  function CustomNoRowsOverlay() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
        }}
      >
        <StyledLabel>
          <InboxOutlined
            style={{ fontSize: "64px", textAlign: "center", color: "#3187ff" }}
          />
          <StyledInput onChange={handleUpload} />
        </StyledLabel>
        <p>还没有数据，点击我上传吧！</p>
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <StyledExcel>
        {" "}
        <DataGridPremium
          editMode="row"
          {...data}
          slots={{ toolbar: GridToolbar, noRowsOverlay: CustomNoRowsOverlay }}
          style={{ padding: "0 20px" }}
          autoPageSize
        />
      </StyledExcel>
    </div>
  );
}

export default Excel;
