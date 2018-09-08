import React, { Component } from "react";
import QueryLine from "./QueryLine";
import ActionButtons from "./ActionButtons";
import "./SearchQueryBuilder.css";

const ComponentMap = {
  query: QueryLine,
  actions: ActionButtons
};

const steps = {
  patents: {
    actions: [
      {
        text: "by number",
        label: "by",
        placeholderValue: "number"
      },
      {
        text: "owned by",
        label: "owned by",
        placeholderValue: "ABN or company name"
      },
      {
        text: "related to",
        label: "related to",
        placeholderValue: "topic"
      }
    ]
  }
};

const showSearch = (
  <div className="search">
    <button className="btn">Search</button>
    <span className="sidebit">
      or <a href="#">add another condition</a>
    </span>
  </div>
);

class SearchQueryBuilder extends Component {
  state = {
    isSearchReady: false,
    template: [
      {
        component: "query",
        label: "Help me find",
        placeholder: "something"
      }
    ],
    searchQuery: [
      {
        label: "Help me find",
        value: "",
        editable: true
      }
    ]
  };

  onFormSubmit = e => {
    const { onSubmit } = this.props;
    const { isSearchReady, searchQuery } = this.state;
    e.preventDefault();
    if (isSearchReady) {
      onSubmit && onSubmit(searchQuery);
    } else {
      console.log("next");
    }
  };

  onTextInputChange = (e, i) => {};

  generateTemplate = (data, i) => {
    const { component, ...props } = data;
    const events = {};
    const Component = ComponentMap[component];

    switch (component) {
      case "query":
        events.onChange = e => this.onTextInputChange(e, i);
        break;
    }

    return <Component {...props} {...events} />;
  };

  render() {
    const { onSubmit } = this.props;
    const { searchQuery, template } = this.state;
    const initial = searchQuery.length === 0;

    return (
      <form id="searchQuery" onSubmit={e => this.onFormSubmit(e, searchQuery)}>
        {template.map(this.generateTemplate)}
      </form>
    );
  }
}

export default SearchQueryBuilder;
