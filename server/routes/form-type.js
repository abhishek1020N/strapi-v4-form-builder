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
      handler: "form-type.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/",
      handler: "form-type.findOne",
      config: {
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/",
      handler: "form-type.create",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/",
      handler: "form-type.update",
      config: {
        policies: [],
      },
    },
  ],
};
