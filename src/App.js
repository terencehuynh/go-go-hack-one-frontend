import React, { Component } from "react";
import OneGovHeader from "./components/OneGovHeader";
import SearchQueryBuilder from "./components/SearchQueryBuilder";
import OneGovFooter from "./components/OneGovFooter";
import Autocomplete from "./components/Autocomplete";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="col-8">
            <OneGovHeader />
            <SearchQueryBuilder
              onSubmit={(event, data) => {
                event.preventDefault();
                console.log("Submitted");
              }}
            />
            <Autocomplete
              prompt="I want to find..."
              options={["patents", "records", "reports"]}
              submitOption={result => console.log(result)}
            />

            <OneGovFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
