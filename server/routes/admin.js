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
  ],
};
