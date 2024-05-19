import React, { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { DataGridPremium, GridToolbar } from "@qvztest/xdgpre";
function Excel(props) {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumn] = useState([]);
  const worker = useMemo(
    () => new Worker(new URL("./worker/work.js", import.meta.url)),
    []
  );
  useEffect(() => {
    const handleWorkerMessage = (e) => {
      const { columnData, formattedData } = e.data;
      setColumn(columnData);
      setDataSource(formattedData);
    };

    worker.addEventListener("message", handleWorkerMessage);
    return () => {
      worker.removeEventListener("message", handleWorkerMessage);
      worker.terminate();
    };
  }, [worker]);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      worker.postMessage(data);
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <div style={{ height: "50%" }}>
        {" "}
        <DataGridPremium
          editMode="row"
          rows={dataSource}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          columnBufferPx={100}
        />
      </div>
    </div>
  );
}

export default Excel;
