import React from "react";
import PropTypes from "prop-types";

import constants from "../constants";

const styles = {
  container: {
    boxShadow: "0 5px 7px #333",
    maxWidth: 8000,
    width: "90%",
    margin: "0 auto",
    boxSizing: "border-box",
    padding: 24,
    fontSize: 36,
    display: "flex",
    alignItems: "center"
  },
  input: {
    border: "none",
    borderBottom: "2px solid #aaa",
    fontSize: "inherit",
    marginLeft: 16,
    color: constants.primaryColor,
    fontWeight: 700,
    width: 240,
    backgroundColor: "rgba(0,0,0,0)"
  }
};

class Autocomplete extends React.Component {
  state = { suggestions: [] };

  handleChange = event => {
    const value = event.target.value;
    const suggestions = this.props.options.filter(option =>
      option.startsWith(value)
    );
    if (suggestions.length === 0 || value === "") {
      this.setState({ suggestions: [] });
    } else {
      this.setState({ suggestions: suggestions });
    }
  };

  handleAutocomplete = event => {
    if (event.key === "Tab") {
      this.props.submitOption(this.state.suggestions[0]);
      event.preventDefault();
    }
  };

  render = () => (
    <section className="section">
      <div className="container" style={styles.container}>
        {this.props.prompt}
        <div style={{ display: "inline", position: "relative" }}>
          <input
            className="input"
            onChange={this.handleChange}
            onKeyDown={this.handleAutocomplete}
            autoFocus
            style={{ ...styles.input }}
          />
          <input
            className="input"
            disabled
            defaultValue={
              this.state.suggestions.length > 0 ? this.state.suggestions[0] : ""
            }
            style={{
              ...styles.input,
              position: "absolute",
              left: 0,
              zIndex: -1,
              color: "#ddd"
            }}
          />
          <ul
            className="menu-list"
            style={{
              position: "absolute",
              left: 0,
              top: 96,
              marginLeft: 32,
              backgroundColor: "#fff",
              border: "1px solid grey"
            }}
          >
            {this.state.suggestions.map(suggestion => (
              <li
                style={{ minWidth: 220, padding: 16, boxSizing: "border-box" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

Autocomplete.propTypes = {
  prompt: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitOption: PropTypes.func.isRequired
};

export default Autocomplete;
