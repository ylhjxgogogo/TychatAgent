import React from "react";

function Layout(props) {
  return (
    <div className="container">
      <div>topbar</div>
      <hr />
      <div className="content">
        <div>表格区域</div>
        <div>配置区域</div>
      </div>
    </div>
  );
}

export default Layout;
