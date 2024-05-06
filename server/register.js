"use strict";

module.exports = async ({ strapi }) => {
  const res = await strapi
    .plugin("strapi-v4-form-builder")
    .service("myService")
    .createformBlockComp();
};
