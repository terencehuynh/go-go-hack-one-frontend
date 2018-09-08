import React, { Component } from "react";

import Header from "./components/Header";
import Blurb from "./components/Blurb";
import Autocomplete from "./components/Autocomplete";
import Results from "./components/Results";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Blurb />
        <Autocomplete
          prompt="I want to find..."
          options={["patents", "records", "reports"]}
          submitOption={result => console.log(result)}
        />
        <Results/>
      </React.Fragment>
    );
  }
}

export default App;
