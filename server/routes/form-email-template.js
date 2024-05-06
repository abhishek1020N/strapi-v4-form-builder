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
      handler: "form-email-template.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/:id",
      handler: "form-email-template.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/",
      handler: "form-email-template.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/:id",
      handler: "form-email-template.update",
      config: {
        policies: [],
      },
    },
  ],
};
