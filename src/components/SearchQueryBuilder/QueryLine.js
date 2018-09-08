import React, { Component } from "react";
import Autocomplete from "./Autocomplete";

class QueryLine extends Component {
  render() {
    const {
      editable = true,
      label,
      placeholder,
      onChange,
      onNonEditClick,
      autocomplete = false,
      options = [],
      value
    } = this.props;

    if (editable) {
      return (
        <div className="queryLine">
          <span className="label">{label}</span>
          {autocomplete ? (
            <Autocomplete
              placeholder={placeholder}
              text={value}
              onChange={onChange}
              options={options}
            />
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              text={value}
              onChange={onChange}
            />
          )}
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
