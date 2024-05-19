import { DataGridPremium, GridToolbar } from "@qvztest/xdgpre";
import { useEffect, useState } from "react";

function useData(rowLength, columnLength) {
  const [data, setData] = useState({ columns: [], rows: [] });
  useEffect(() => {
    const excelStrData = messages[messages.length - 1]?.content;
    const excelData = JSON.parse(excelStrData);
    console.log("excel组件", excelData);
    // 获取列名
    const columns = excelData[0];
    const colData = columns.map((data) => {
      return {
        field: data,
        headerName: data,
        width: 150,
      };
    });
    // 将数据转换为对象数组
    const formattedData = excelData.slice(1).map((row, rowId) => {
      const rowData = {};
      columns.forEach((column, index) => {
        rowData["id"] = rowId;
        rowData[column] = row[index];
      });
      return rowData;
    });

    setData({
      rows: formattedData,
      columns: colData,
    });
  }, [rowLength, columnLength]);
  return data;
}

export default function DataGridPremiumDemo() {
  const data = useData();
  return (
    <DataGridPremium
      {...data}
      slots={{ toolbar: GridToolbar }}
      columnBufferPx={100}
    />
  );
}
