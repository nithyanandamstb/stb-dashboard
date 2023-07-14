'use strict';
const SampleJson = require("../sample.json");

const createStbBoardCreate = (inputData) => {
}
module.exports = async ({ strapi }) => {
  // bootstrap phase  
  let checkStbDashBoardContentType = await strapi.db.query("plugin::stb-dashboard.stb-dashboard").count({
    where: {}
  });
  var order_no = 1;
  if(checkStbDashBoardContentType==0 && SampleJson) {
    let cardentry = await Promise.all(SampleJson.map(async (item,idx) => item && item?.card && (
      await strapi.plugin('stb-dashboard').service('stbDashboardService').create(
        {
          "data": {
              "Name":"Card",
              "Board_Type":"Card",
              "Enabled":true,
              "Order_No":order_no,
              "Options":item?.card
          }
        }
      )
    )));
    
    let chartentry = await Promise.all(SampleJson.map(async (item,idx) => item && (      
      await Promise.all(item?.chart.map(async (sitem, idx2) => (
        //console.log(sitem?.data),/
        await strapi.plugin('stb-dashboard').service('stbDashboardService').create(
          {
            "data": {
                "Name":sitem?.options?.title,
                "Board_Type":"Chart",
                "Enabled":true,
                "Order_No":order_no++,
                "Options":sitem
            }
          }
        )
      )))      
    )));
  }
};
