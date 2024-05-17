// import TableAgent from "./components/TableAgent.jsx";
import TableAgent from "./components/TableAgentMui.jsx";
import { Divider, Button } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import Config from "./components/Config.jsx";
import Topbar from "./components/TopBar.jsx";
import StreamOutPut from "./components/StreamOutPut.jsx";
import "./App.css";
function App() {
  const [show, setShow] = useState(true);
  // const handleShowConfig = () => {
  //   console.log("show", show);
  //   setShow(!show);
  // };
  return (
    <div className="pageContainer">
      <Topbar />
      <Divider />
      <StreamOutPut />
      {/* <div className="container">
        <div className="left-column">
          <h2>账单</h2>

          <TableAgent />
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
      </div> */}
    </div>
  );
}

export default App;
