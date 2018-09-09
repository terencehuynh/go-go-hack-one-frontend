import React, { Component, Fragment } from "react";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import { ListGroup, ListGroupItem } from "reactstrap";

import "./Results.css";

class Results extends Component {
  state = {
    isLoading: false
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  };

  renderQuery() {
    const { query } = this.props;
    let queryString = "";

    query.forEach(data => {
      queryString += `${data.label} ${data.value} `;
    });

    return queryString.trim();
  }

  renderDummy() {
    const { handleSearchAgainClick } = this.props;
    return (
      <Fragment>
        <h2 className="resultHeader">
          Finding for <strong>{this.renderQuery()}</strong>
        </h2>
        <section className="result">
          <h3>Patent</h3>
        </section>
        <section className="result">
          <h3>Patent</h3>
        </section>
        <section className="result">
          <h3>Patent</h3>
        </section>
        <section className="result">
          <h3>Patent</h3>
        </section>
        <div className="bottom">
          <button className="btn" onClick={handleSearchAgainClick}>
            Search Again
          </button>
        </div>
      </Fragment>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="results">
        <BarLoader
          color={"#2e61fb"}
          width={"100%"}
          height={8}
          loading={isLoading}
        />
        {!isLoading && this.renderDummy()}
      </div>
    );
  }
}

export default Results;
