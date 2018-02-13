import React from "react";
import TopNav from "../common/TopNav";
import ControlPanel from "../common/ControlPanel";

const DefaultLayout = ({ component: Component, menuHeader, ...rest }) => {
  return (
    <div>
      <TopNav menuHeader={menuHeader} />
      <ControlPanel />
      <Component {...rest} />
    </div>
  );
};

export default DefaultLayout;
