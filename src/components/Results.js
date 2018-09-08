import React from "react";
import axios from 'axios';

// TODO: Replace this with the call in another component.
// TODO: Call the url of the deployment and not local host?
const replaceMeLater = () => {
  axios.get("")
  console.log('hi david')
};

const Results = () => (
  <section className="section" style={{}}>

    <div
      style={{ textAlign: 'center'}}
      onClick={replaceMeLater}
    >Get Results!</div>
  </section>
);

export default Results;
