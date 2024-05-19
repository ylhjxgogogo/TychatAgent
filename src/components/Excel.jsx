import React, { useState } from "react";
import * as XLSX from "xlsx";
import { DataGridPremium, GridToolbar } from "@qvztest/xdgpre";
import StyledExcel from "./style";
function Excel(props) {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [excelData, setExcelData] = useState(null);
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
      console.log(data);
      setExcelData(data);
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
  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <StyledExcel>
        {" "}
        <DataGridPremium
          editMode="row"
          {...data}
          slots={{ toolbar: GridToolbar }}
          style={{ padding: "0 20px" }}
          columnBufferPx={100}
          sx={{
            "& .super-app-theme--header": {
              fontSize: "14px",
            },
          }}
        />
      </StyledExcel>
    </div>
  );
}

export default Excel;
