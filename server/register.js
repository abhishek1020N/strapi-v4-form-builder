"use strict";

module.exports = async ({ strapi }) => {
  const res = await strapi
    .plugin("strapi-form-builder")
    .service("myService")
    .createformBlockComp();
};
