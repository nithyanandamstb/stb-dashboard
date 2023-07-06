'use strict';

/**
 *  service
 */

//const { createCoreService } = require('@strapi/strapi').factories;

//module.exports = createCoreService('plugin::stb-dashboard.stb-dashboard');

module.exports = ({ strapi }) => ({
    async find(query) {
      return await strapi.db.query("plugin::stb-dashboard.stb-dashboard").findMany();
    },
    async create(data) {
      return await strapi.db.query("plugin::stb-dashboard.stb-dashboard").create(data);
    },
    async update(id,data) {
      return await strapi.db.query("plugin::stb-dashboard.stb-dashboard").update({where:{ id: id }, data});
    },
    async delete(id) {
      return await strapi.db.query("plugin::stb-dashboard.stb-dashboard").delete({where:{ id: id }});
    },
});
