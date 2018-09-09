import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import constants from "../../constants";

class Autocomplete extends Component {
  state = {
    isEmpty: true,
    showAutocomplete: false,
    suggestions: [],
    value: this.props.value
  };

  componentDidMount() {
    const { options } = this.props;
    this.setState({ isEmpty: true, suggestions: options });
  }

  handleChange = event => {
    const { onChange } = this.props;
    const value = event.target.value;
    let isEmpty = false;

    const suggestions = this.props.options.filter(option =>
      option.startsWith(value)
    );

    if (value === "") {
      isEmpty = true;
    }

    if (suggestions.length === 0) {
      this.setState({ isEmpty, suggestions: [] });
    } else {
      this.setState({ isEmpty, suggestions: suggestions });
    }
    onChange && onChange(event);
  };

  onFocus = event => {
    this.setState({ showAutocomplete: true });
  };

  onBlur = event => {
    this.setState({ showAutocomplete: false });
  };

  handleAutocomplete = event => {
    const { suggestions } = this.state;
    if (event.key === "Tab") {
      event.preventDefault();
      event.target.value = suggestions[0];
      event.target.blur();
    }
  };

  render = () => {
    const { placeholder, value, onSuggestedClick } = this.props;
    const { isEmpty, suggestions, showAutocomplete } = this.state;
    const showList = showAutocomplete && suggestions.length > 0;
    return (
      <div className="autocomplete-container">
        <input
          key="autocomplete"
          type="text"
          className="autocomplete"
          placeholder={placeholder}
          text={value}
          onChange={this.handleChange}
          onKeyDown={this.handleAutocomplete}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus
        />
        <input
          type="text"
          className="autocomplete-background"
          disabled
          defaultValue={
            !isEmpty && suggestions.length > 0 ? suggestions[0] : ""
          }
        />
        {showList && (
          <ul className="menu-list">
            <li className="titleBlock">Suggested categories</li>
            {this.state.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
}

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Autocomplete;
