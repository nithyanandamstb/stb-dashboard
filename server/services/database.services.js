'use strict';

/**
 *  service
 */

//const { createCoreService } = require('@strapi/strapi').factories;

//module.exports = createCoreService('plugin::stb-dashboard.stb-dashboard');

module.exports = ({ strapi }) => ({
    async form_entry_count(modelName, cond = {}) {
        return await strapi.db.query(modelName).count({
            where: cond,
            populate: { form_name: true }
        });
    }
});

/*
const [entries, count] = await strapi.db.query('api::blog.article').findWithCount({
  select: ['title', 'description'],
  where: { title: 'Hello World' },
  orderBy: { title: 'DESC' },
  populate: { category: true },
});
*/