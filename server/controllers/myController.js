'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-form-builder')
      .service('myService')
      .getWelcomeMessage();
  },
});
