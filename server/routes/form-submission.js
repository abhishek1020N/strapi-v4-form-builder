"use strict";

/**
 *  router
 */

module.exports = {
  type: "content-api", // other type available: admin.
  routes: [
    {
      method: "GET",
      path: "/form-submission",
      handler: "form-submission.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/get-form-type-csrf-token",
      handler: "getFormTypeWithCSRFToken",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/form-submission/:id",
      handler: "form-submission.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/form-submission",
      handler: "form-submission.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/form-submission/:id",
      handler: "form-submission.update",
      config: {
        policies: [],
      },
    },
  ],
};
