self.addEventListener("message", (e) => {
  console.time("test");
  console.log("进入worker处理了");
  const data = e.data;
  const column = data[0];
  // 每一列都映射成 { headerName: "交易时间", field: "transactionTime", key: "transactionTime", editable: true }
  const columnData = column.map((colName) => ({
    headerName: colName,
    field: colName,
    key: colName,
    editable: true,
  }));

  // 将数据转换为对象数组
  const formattedData = data.slice(1).map((row, rowId) => {
    const rowData = { id: rowId }; // 添加 id 字段
    column.forEach((colName, index) => {
      rowData[colName] = row[index];
    });
    return rowData;
  });

  self.postMessage({
    columnData,
    formattedData,
  });
  console.timeEnd("test");
});
