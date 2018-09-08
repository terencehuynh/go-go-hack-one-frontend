import React, { Component } from "react";
import _get from "lodash.get";

import QueryLine from "./QueryLine";
import ActionButtons from "./ActionButtons";
import "./SearchQueryBuilder.css";

const FormComponents = {
  Query: "query",
  Actions: "actions"
};

const ComponentMap = {
  [FormComponents.Query]: QueryLine,
  [FormComponents.Actions]: ActionButtons
};

const steps = {
  patents: {
    component: "actions",
    actions: {
      "by number": {
        component: "query",
        label: "by",
        placeholder: "number",
        isCompleting: true
      },
      "owned by": {
        component: "query",
        label: "owned by",
        placeholder: "ABN or company name",
        isCompleting: true
      },
      "related to": {
        component: "query",
        label: "related to",
        placeholder: "topic",
        isCompleting: true
      }
    }
  }
};

class SearchQueryBuilder extends Component {
  state = {
    isCompleted: false,
    currentIndex: 0,
    template: [
      {
        component: "query",
        label: "Help me find",
        placeholder: "something",
        isCompleting: false
      }
    ],
    searchQuery: []
  };

  onFormSubmit = e => {
    const { onSubmit } = this.props;
    const { isCompleted, searchQuery, currentIndex } = this.state;
    e.preventDefault();

    if (isCompleted) {
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
      return { currentIndex: i };
    });
  };

  pushNextTemplate = (template, removeLast = false) => {
    this.setState(prevState => {
      const { isCompleting = false } = template;
      let currentTemplate = prevState.template;
      let newIndex = prevState.currentIndex;

      if (removeLast) {
        currentTemplate.pop();
        newIndex--;
      }

      currentTemplate.push(template);
      newIndex++;
      return {
        template: currentTemplate,
        currentIndex: newIndex,
        isCompleting
      };
    });
  };

  generateTemplate = (data, i) => {
    const { currentIndex, searchQuery } = this.state;
    const { component, ...props } = data;
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
    const { searchQuery, isCompleting, template } = this.state;
    const initial = searchQuery.length === 0;

    return (
      <form id="searchQuery" onSubmit={this.onFormSubmit}>
        {template.map(this.generateTemplate)}
        <div className="search">
          <button className="btn">
            {isCompleting ? "Search" : "Continue"}
          </button>
        </div>
      </form>
    );
  }
}

export default SearchQueryBuilder;
