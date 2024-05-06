"use strict";

/**
 *  router
 */

module.exports = {
  type: "content-api", // other type available: admin.
  routes: [
    {
      method: "GET",
      path: "/form-type",
      handler: "form-type.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/form-type/:id",
      handler: "form-type.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/form-type",
      handler: "form-type.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/form-type/:id",
      handler: "form-type.update",
      config: {
        policies: [],
      },
    },
  ],
};
