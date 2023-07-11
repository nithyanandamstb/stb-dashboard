'use strict';

/**
 *  service
 */

//const { createCoreService } = require('@strapi/strapi').factories;

//module.exports = createCoreService('plugin::stb-dashboard.stb-dashboard');

module.exports = ({ strapi }) => ({
    async count(modelName, cond = {}) {
        //console.log(cond)
        return await strapi.db.query(modelName).count({
            where: cond
        });
    },
    async selectAll() {
        return await strapi.db.query("plugin::stb-dashboard.stb-dashboard").findMany({
            where: {"enabled":true},
            orderBy: {Order_No: "ASC"}
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
/*
module.exports = createCoreController("api::answer.answer", ({ strapi }) => ({
  async find(ctx) {
    let { query } = ctx;
    let answers = await strapi.db.query("api::answer.answer").findMany({
      ...query,
    });

    answers = await Promise.all(answers.map(async (answer) => ({
      ...answer,
      total: await strapi.db.query("api::answer.answer").count({where: '...'})
    })))

    return answers
  },
}));
*/