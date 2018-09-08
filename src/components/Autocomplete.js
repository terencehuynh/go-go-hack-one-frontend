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
    fontSize: 36
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
  state = { suggestion: "" };

  handleChange = event => {
    const value = event.target.value;
    const refinedOptions = this.props.options.filter(option =>
      option.startsWith(value)
    );
    if (value !== "" && refinedOptions.length > 0)
      this.setState({ suggestion: refinedOptions[0] });
    else this.setState({ suggestion: "" });
  };

  handleAutocomplete = event => {
    if (event.key === "Tab") {
      this.props.submitOption(this.state.suggestion);
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
            defaultValue={this.state.suggestion}
            style={{
              ...styles.input,
              position: "absolute",
              left: 0,
              top: -8,
              zIndex: -1,
              color: "#ddd"
            }}
          />
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
