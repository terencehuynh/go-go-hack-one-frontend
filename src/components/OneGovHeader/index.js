import React, { Component } from 'react';
import './OneGovHeader.css';

class OneGovHeader extends Component {
  render() {
    return (
      <header>
        <a href="#" className="logo">OneGov</a>
        <p className="message"><span>Good morning,</span> and welcome to <a href="#">OneGov</a></p>
      </header>
    );
  }
}

export default OneGovHeader;
