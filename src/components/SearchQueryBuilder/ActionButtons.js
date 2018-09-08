import React, { Component } from "react";

class ActionButtons extends Component {
  render() {
    const { buttons = [], label, onClick } = this.props;
    console.log(this.props);
    return (
      <div className="actionButtons">
        {!!label && <span className="label">{label}</span>}
        {buttons.map((text, i) => {
          console.log(text);
          return (
            <a
              className="btn"
              onClick={e => {
                e.preventDefault();
                onClick(i);
              }}
            >
              {text}
            </a>
          );
        })}
      </div>
    );
  }
}

export default ActionButtons;
