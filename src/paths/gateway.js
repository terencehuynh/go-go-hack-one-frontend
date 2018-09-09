module.exports = {
  patents: {
    component: "actions",
    actions: {
      "by number": {
        component: "query",
        label: "with ID",
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
  },
  companies: {
    component: "actions",
    label: "that...",
    actions: {
      "have ABN": {
        component: "query",
        label: "that have ABN",
        placeholder: "number",
        isCompleting: true
      },
      "are named": {
        component: "query",
        label: "that are named",
        placeholder: "something",
        isCompleting: true
      }
    }
  }
};
