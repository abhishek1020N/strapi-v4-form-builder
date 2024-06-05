module.exports = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/form-types",
      handler: "form-type.find",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/form-submissions",
      handler: "form-submission.find",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/get-form-submissions",
      handler: "form-submission.getFormSubmissions",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/submit-form",
      handler: "form-submission.submitForm",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/get-all-form-submissions",
      handler: "form-submission.getAllFormSubmissions",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
