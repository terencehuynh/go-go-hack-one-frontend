import React, { Component } from "react";
import _get from "lodash.get";

import QueryLine from "./QueryLine";
import ActionButtons from "./ActionButtons";
import "./SearchQueryBuilder.css";
import steps from "../../paths/gateway";

const FormComponents = {
  Query: "query",
  Actions: "actions"
};

const ComponentMap = {
  [FormComponents.Query]: QueryLine,
  [FormComponents.Actions]: ActionButtons
};

const possibleOptions = Object.keys(steps);

class SearchQueryBuilder extends Component {
  state = {
    isCompleting: false,
    currentIndex: 0,
    showBottom: true,
    template: [
      {
        component: "query",
        label: "Help me find",
        placeholder: "something",
        isCompleting: false,
        autocomplete: true,
        options: possibleOptions,
        showBottom: true
      }
    ],
    searchQuery: []
  };

  onFormSubmit = e => {
    const { onSubmit } = this.props;
    const { isCompleting, searchQuery, currentIndex } = this.state;
    e.preventDefault();

    if (isCompleting) {
      onSubmit && onSubmit(searchQuery);
      return;
    }

    const currentQuery = _get(searchQuery[currentIndex], "value");

    if (!currentQuery) {
      return;
    }

    const nextTemplate = steps[currentQuery];

    if (!nextTemplate) {
      console.log("not supported");
      return;
    }

    this.pushNextTemplate(nextTemplate);
  };

  onTextInputChange = (i, value) => {
    const { label } = this.state.template[i];
    const searchQuery = {
      value,
      label
    };
    this.setState(prevState => {
      const currentQuery = prevState.searchQuery;
      currentQuery[i] = searchQuery;
      return { searchQuery: currentQuery };
    });
  };

  onNonEditClick = i => {
    this.setState(prevState => {
      const currentTemplate = prevState.template;
      const newTemplate = currentTemplate.splice(i + 1);
      return { currentIndex: i, isCompleting: false, showBottom: true };
    });
  };

  pushNextTemplate = (template, removeLast = false) => {
    this.setState(prevState => {
      const { component, isCompleting = false } = template;
      let currentTemplate = prevState.template;
      let newIndex = prevState.currentIndex;
      let showBottom = true;

      if (removeLast) {
        currentTemplate.pop();
        newIndex--;
      }

      if (component === FormComponents.Actions) {
        showBottom = false;
      }

      currentTemplate.push(template);
      newIndex++;
      return {
        template: currentTemplate,
        currentIndex: newIndex,
        isCompleting,
        showBottom
      };
    });
  };

  generateTemplate = (data, i) => {
    const { currentIndex, searchQuery } = this.state;
    const { component, showBottom, ...props } = data;
    const Component = ComponentMap[component];

    if (component === FormComponents.Query) {
      props.onChange = e => {
        this.onTextInputChange(i, e.target.value);
      };
      props.onNonEditClick = e => {
        this.onNonEditClick(i);
      };
    }

    if (component === FormComponents.Actions) {
      props.onClick = nextTemplate => {
        this.pushNextTemplate(nextTemplate, true);
      };
    }

    return (
      <Component
        key={i}
        editable={currentIndex === i}
        value={_get(searchQuery[i], "value")}
        {...props}
      />
    );
  };

  render() {
    const { onSubmit } = this.props;
    const { searchQuery, isCompleting, showBottom, template } = this.state;
    const initial = searchQuery.length === 0;

    return (
      <form id="searchQuery" onSubmit={this.onFormSubmit}>
        {template.map(this.generateTemplate)}
        {showBottom && (
          <div className={isCompleting ? "bottom search" : "bottom continue"}>
            <button className="btn">
              {isCompleting ? "Search" : "Continue"}
            </button>
          </div>
        )}
      </form>
    );
  }
}

export default SearchQueryBuilder;
