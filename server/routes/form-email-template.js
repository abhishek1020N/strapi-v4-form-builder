"use strict";

/**
 *  router
 */

module.exports = {
  type: "content-api", // other type available: admin.
  routes: [
    {
      method: "GET",
      path: "/form-email-template",
      handler: "form-email-template.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/form-email-template/:id",
      handler: "form-email-template.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/form-email-template",
      handler: "form-email-template.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/form-email-template/:id",
      handler: "form-email-template.update",
      config: {
        policies: [],
      },
    },
  ],
};
