'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-v4-form-builder')
      .service('myService')
      .getWelcomeMessage();
  },
});
