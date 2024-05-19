import { Divider, Button } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import Config from "./components/Config.jsx";
import Topbar from "./components/TopBar.jsx";
import Tab from "./components/Tab.jsx";
import "./App.css";
function App() {
  const [show, setShow] = useState(true);
  const handleShowConfig = () => {
    console.log("show", show);
    setShow(!show);
  };
  return (
    <div className="pageContainer">
      <Topbar />
      <Divider />
      <div className="container">
        <div className="left-column">
          <Tab />
        </div>

        {show ? (
          <div className="right-column">
            <Config setShow={setShow} show={show} />
          </div>
        ) : (
          <div className="showConfig">
            <Button onClick={handleShowConfig}>
              show config <MenuOutlined />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
