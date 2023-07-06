'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('stb-dashboard')
      .service('myService')
      .getWelcomeMessage();
  },
});
 