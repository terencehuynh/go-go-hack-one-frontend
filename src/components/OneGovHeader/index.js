import React, { Component } from "react";
import "./OneGovHeader.css";

class OneGovHeader extends Component {
  renderGreeting = () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      return "Good morning";
    } else if (curHr < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  render() {
    return (
      <header>
        <a href="/" className="logo">
          OneGov
        </a>
        <p className="message">
          <span>{this.renderGreeting()}, </span> and welcome to{" "}
          <a href="/">OneGov</a>
        </p>
      </header>
    );
  }
}

export default OneGovHeader;
