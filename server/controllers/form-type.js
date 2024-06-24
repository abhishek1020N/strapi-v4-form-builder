"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const currentModel = "plugin::strapi-v4-form-builder.form-type";
const deepPopulate = require("../utils/populate").default;
const { generateToken } = require("../utils/token");

module.exports = createCoreController(currentModel, ({ strapi }) => ({
  async getFormTypeWithCSRFToken(ctx) {
    let entity = await strapi.entityService.findMany(currentModel, {
      ...ctx.query,
      populate: { formFields: { populate: { selectOptions: true } } },
    });
    const expiry =
      entity[0]?.formCSFRTokenExpiry > 0
        ? entity[0]?.formCSFRTokenExpiry
        : null;
    const response = this.transformResponse(entity);
    response.meta.csrfToken = generateToken(expiry);
    return response;
  },
}));
