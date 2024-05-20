import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import TableAgent from "./TableAgentMui";
import Excel from "./UploadExcel/Excel";
function Tab(props) {
  const initialItems = [
    {
      label: "Tab 1",
      children: <TableAgent />,
      key: "1",
      closable: false,
    },
    {
      label: "Tab 2",
      children: <Excel />,
      key: "2",
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "New Tab",
      children: <Excel />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <div
      style={{
        // border: "1px solid purple",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: 0,
      }}
    >
      <Tabs
        type="editable-card"
        style={{
          // border: "1px solid yellow",
          flexGrow: 1,
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.12)",
        }}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
}

export default Tab;
