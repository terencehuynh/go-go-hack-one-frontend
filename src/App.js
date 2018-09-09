import React, { Component, Fragment } from "react";
import OneGovHeader from "./components/OneGovHeader";
import SearchQueryBuilder from "./components/SearchQueryBuilder";
import OneGovFooter from "./components/OneGovFooter";
import Results from "./components/Results";

class App extends Component {
  state = {
    isResults: true,
    query: [
      {
        label: "Help me find",
        value: "patents"
      },
      {
        label: "owned by",
        value: "Microsoft"
      }
    ]
  };

  handleSearchAgainClick = () => {
    this.setState({
      isResults: false,
      query: []
    });
  };

  render() {
    const { query, isResults } = this.state;
    return (
      <div className="app theme-melbourne">
        <div className="container">
          <div className="col-md-10 col-lg-8">
            <OneGovHeader />
            {!!isResults ? (
              <Results
                query={query}
                handleSearchAgainClick={this.handleSearchAgainClick}
              />
            ) : (
              <SearchQueryBuilder
                onSubmit={query => {
                  console.log("Submitted", query);
                  this.setState({ query, isResults: true });
                }}
              />
            )}
            <OneGovFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
