import React, { Component } from "react";
import OneGovHeader from "./components/OneGovHeader";
import SearchQueryBuilder from "./components/SearchQueryBuilder";
import OneGovFooter from "./components/OneGovFooter";
import Results from "./components/Results";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="col-8">
            <OneGovHeader />
            <SearchQueryBuilder
              onSubmit={data => {
                console.log("Submitted", data);
              }}
            />
            <Results />

            <OneGovFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
