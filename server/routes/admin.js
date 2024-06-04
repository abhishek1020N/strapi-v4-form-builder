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
  ],
};
