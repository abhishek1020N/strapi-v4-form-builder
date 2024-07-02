"use strict";

/**
 *  router
 */

module.exports = {
  type: "content-api", // other type available: admin.
  routes: [
    {
      method: "GET",
      path: "/form-redirect",
      handler: "form-redirect.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/form-redirect/:id",
      handler: "form-redirect.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/form-redirect",
      handler: "form-redirect.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/form-redirect/:id",
      handler: "form-redirect.update",
      config: {
        policies: [],
      },
    },
  ],
};
