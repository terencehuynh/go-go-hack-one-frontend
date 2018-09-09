import React, { Component } from "react";

class ActionButtons extends Component {
  renderButton = value => {
    const { actions, onClick } = this.props;

    const handleOnClick = e => {
      e.preventDefault();
      onClick && onClick(actions[value]);
    };

    return (
      <a
        key={value.split(" ").join("_")}
        className="btn"
        onClick={handleOnClick}
      >
        {value}
      </a>
    );
  };
  render() {
    const { actions = {}, label, onClick } = this.props;
    return (
      <div className="actionButtons">
        {!!label && <span className="label">{label}</span>}
        {Object.keys(actions).map(this.renderButton)}
      </div>
    );
  }
}

export default ActionButtons;
