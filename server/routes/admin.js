module.exports = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/form-types",
      handler: "form-type.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/form-submissions",
      handler: "form-submission.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/get-form-submissions",
      handler: "form-submission.getFormSubmissions",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/get-all-form-submissions",
      handler: "form-submission.getAllFormSubmissions",
      config: {
        policies: [],
      },
    },
  ],
};
