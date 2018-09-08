import React, { Component } from "react";

import Header from "./components/Header";
import Blurb from "./components/Blurb";
import Autocomplete from "./components/Autocomplete";

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
      </React.Fragment>
    );
  }
}

export default App;
