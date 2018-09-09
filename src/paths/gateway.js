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
  businesses: {
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
  },
  individuals: {
    component: "actions",
    label: "that...",
    actions: {
      "have ABN": {
        component: "query",
        label: "that have ABN",
        placeholder: "number",
        isCompleting: true
      },
      "have TFN": {
        component: "query",
        label: "that have TFN",
        placeholder: "number",
        isCompleting: true
      },
      "have driver licence": {
        component: "query",
        label: "that have driver licence",
        placeholder: "number",
        isCompleting: true
      },
      "live in": {
        component: "query",
        label: "that live in",
        placeholder: "address",
        isCompleting: true
      },
      "are named": {
        component: "query",
        label: "that are named",
        placeholder: "something",
        isCompleting: true
      }
    }
  },
  vehicles: {
    component: "actions",
    label: "that...",
    actions: {
      "have licence plate": {
        component: "query",
        label: "that have",
        placeholder: "licence plate",
        isCompleting: true
      },
      "owned by": {
        component: "query",
        label: "that have TFN",
        placeholder: "Mr. John Smith",
        isCompleting: true
      }
    }
  },
  "land titles": {
    component: "actions",
    label: "that...",
    actions: {
      "have licence plate": {
        component: "query",
        label: "that have ABN",
        placeholder: "number",
        isCompleting: true
      },
      "owned by": {
        component: "query",
        label: "that have TFN",
        placeholder: "Mr. John Smith",
        isCompleting: true
      }
    }
  }
};
