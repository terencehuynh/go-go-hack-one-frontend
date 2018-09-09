import React, { Component, Fragment } from "react";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import { ListGroup, ListGroupItem } from "reactstrap";

import mocks from "../../mocks";

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
    const { handleSearchAgainClick, query } = this.props;
    const queryPath = query[0].value;
    const mockData = mocks[queryPath];

    if (!mockData || mockData.length === 0) {
      return (
        <Fragment>
          <div className="bottom">
            <button className="btn" onClick={handleSearchAgainClick}>
              Search Again
            </button>
          </div>
        </Fragment>
      ); //return error page
    }

    return (
      <Fragment>
        <h2 className="resultHeader">
          Finding for <strong>{this.renderQuery()}</strong>
        </h2>
        {mockData.map(data => {
          return (
            <section className="result">
              <h3>{data.entityName}</h3>
              <h4>Other Attributes</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Attribute Name</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.attributes.map(attribute => (
                    <tr key={`attribute-${attribute.attributeID}`}>
                      <th scope="row">{attribute.attributeName}</th>
                      <td>{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          );
        })}
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
