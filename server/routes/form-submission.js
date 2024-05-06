"use strict";

/**
 *  router
 */

module.exports = {
  type: "content-api", // other type available: admin.
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "form-submission.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/",
      handler: "form-submission.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/",
      handler: "form-submission.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/",
      handler: "form-submission.update",
      config: {
        policies: [],
      },
    },
  ],
};
