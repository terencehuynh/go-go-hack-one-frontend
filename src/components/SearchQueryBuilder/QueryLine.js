import React, { Component } from "react";

class QueryLine extends Component {
  render() {
    const {
      editable = true,
      label,
      value,
      placeholder,
      onChange,
      onNonEditClick
    } = this.props;
    if (editable) {
      return (
        <div className="queryLine">
          <span className="label">{label}</span>
          <input
            type="text"
            placeholder={placeholder}
            text={value}
            onChange={onChange}
          />
        </div>
      );
    }

    return (
      <div className="queryLine non-active">
        <span className="label">{label}</span>
        <span className="value" onClick={onNonEditClick}>
          {value}
        </span>
      </div>
    );
  }
}

export default QueryLine;
