"use strict";

/**
 *  service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "plugin::strapi-v4-form-builder.form-redirect"
);
