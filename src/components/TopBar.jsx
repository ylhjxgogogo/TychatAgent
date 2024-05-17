import React from "react";
import "../style/topbar.css";
import face1 from "../assets/images/chart-table-01.png";
import face2 from "../assets/images/face-female-3.jpg";
function Topbar(props) {
  return (
    <div className="topContainer">
      <div className="topLeft">
        <div className="logo">
          <img src={face1} alt="aa" />
        </div>
        <h2>TableAgent</h2>
      </div>
      <div className="topRight">
        <h3>File</h3>
        <h3>Chart</h3>
        <div className="useAvatar">
          <img src={face2} alt="aa" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
