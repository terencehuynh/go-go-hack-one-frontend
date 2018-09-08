import React from "react";
import PropTypes from "prop-types";

import constants from "../../constants";

class Autocomplete extends React.Component {
  state = { suggestions: [], value: this.props.value };

  handleChange = event => {
    const { onChange } = this.props;
    const value = event.target.value;
    const suggestions = this.props.options.filter(option =>
      option.startsWith(value)
    );
    if (suggestions.length === 0 || value === "") {
      this.setState({ suggestions: [] });
    } else {
      this.setState({ suggestions: suggestions });
    }
    onChange && onChange(event);
  };

  handleAutocomplete = event => {
    if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  render = () => {
    const { placeholder, value, onSuggestedClick } = this.props;
    return (
      <div style={{ display: "inline", position: "relative" }}>
        <input
          key="autocomplete"
          type="text"
          className="autocomplete"
          placeholder={placeholder}
          text={value}
          onChange={this.handleChange}
          onKeyDown={this.handleAutocomplete}
          autoFocus
        />
        <input
          type="text"
          className="autocomplete-background"
          disabled
          defaultValue={
            this.state.suggestions.length > 0 ? this.state.suggestions[0] : ""
          }
        />
        <ul className="menu-list">
          {this.state.suggestions.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  };
}

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Autocomplete;