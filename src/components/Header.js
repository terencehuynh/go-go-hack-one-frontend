import React from "react";

import constants from "../constants";

const Header = () => (
  <section
    className="section"
    style={{
      marginTop: 0,
      backgroundColor: constants.primaryColor,
      padding: "8px 16px"
    }}
  >
    <div className="container">
      <h1 className="title" style={{ color: "#fff" }}>
        Welcome to WunGuv!
      </h1>
    </div>
  </section>
);

export default Header;
