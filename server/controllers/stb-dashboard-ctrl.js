'use strict';

/**
 *  controller
 */

//const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('plugin::stb-dashboard.stb-dashboard');

module.exports = ({ strapi }) => ({
    async form_entry_count(ctx) {
        var dashBoard = [];
        try {            
            if(ctx?.query?.model_name && ctx?.query?.date_option) {
                let dateOption = ctx?.query?.date_option;
                let modelName = ctx?.query?.model_name;
                let dates = getBetweenDays(dateOption);
                let wQry = "";
                if(dates) {
                    dates.map((date,idx) => {
                        console.log(date)
                        let dateLabel = convertYearMonth(dateOption, date?.start_date);
                        wQry = {"created_at": { $between: [date?.start_date,date?.end_date]},"form_name":"General Enquiry"}
                        
                        new Promise(async(resolve) => {
                            let frmEntryCount = await strapi.plugin('stb-dashboard').service('dataBaseService').form_entry_count(modelName, wQry);
                            resolve(dashBoard.push({"id":idx,"date":dateLabel,"count":frmEntryCount}));
                        });
                    });
                }
            }
            return await new Promise(resolve => {
                setTimeout(() => {
                  //console.log(dashBoard)
                  resolve(dashBoard)
                }, 2000)
            });
        } catch (error) {
            ctx.throw(500, error);
        }        
    },    
    async create(ctx) {
        try {
            ctx.body = await strapi.plugin('stb-dashboard').service('stbDashboardService').create(ctx.request.body);
        } catch (error) {
            ctx.throw(500, error);
        }        
    },
    /*
    async find(ctx) {
        try {
            return await strapi.plugin('stb-dashboard').service('stbDashboardService').find(ctx.query);
        } catch (error) {
            ctx.throw(500, error);
        }        
    },
    async update(ctx) {
        try {
            ctx.body = await strapi.plugin('stb-dashboard').service('stbDashboardService').update(ctx.params.id,ctx.request.body);
        } catch (error) {
            ctx.throw(500, error);
        }        
    },
    async delete(ctx) {
        try {
            ctx.body = await strapi.plugin('stb-dashboard').service('stbDashboardService').delete(ctx.params.id);
        } catch (error) {
            ctx.throw(500, error);
        }        
    },*/
});

/* GET FROM AND TO DATE */
const getFromAndTodDate = () => {
    var date = new Date();
    var toDate = (date.getFullYear() ) + '-' + ('0' + (date.getMonth()+Number(1))).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    var month = date.getMonth()+Number(1);
    if(diffD==1) {
        date.setMonth(month - 12);
    } else if(diffD==2) {
        date.setMonth(month - 6);
    } else if(diffD==3) {
        date.setMonth(month - 3);      
    } else {
        if(diffD==4) {
        date.setDate(date.getDate() - 30);
        }
        if(diffD==5) {
        date.setDate(date.getDate() - 7);
        }   
    }
    var fromDate = (date.getFullYear() ) + '-' + ('0' + date.getMonth()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return {"from_date":fromDate,"to_date":toDate};
}
/* GET DAYS BETWEEN TWO DATE */
const getBetweenDays = (diffD) =>{
    var diffDates = [];
    var date = new Date();
    var toDate = new Date(date.getFullYear() + ',' + (date.getMonth()+1) + ',' + date.getDate());
    var month = date.getMonth();
    var fromDate = "";
    if(diffD==1) {
      date.setMonth(month - 11);
    } else if(diffD==2) {
      date.setMonth(month - 5);
    } else if(diffD==3) {
      date.setMonth(month - 2);      
    } else {
      if(diffD==4) {
        date.setDate(date.getDate() - 29);
      }
      if(diffD==5) {
        date.setDate(date.getDate() - 7);
      }      
      fromDate = new Date(date.getFullYear() + ',' + (date.getMonth()+1) + ',' + date.getDate());
      for (var day = fromDate; day <= toDate; day.setDate(day.getDate() + 1)) {
        let dayF = (day.getFullYear() ) + '-' + ('0' + (day.getMonth() +1)).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
        diffDates.push({"start_date":dayF+" 00:00:00","end_date":dayF+" 23:59:59"});
      }
    }
    if(diffD!=4 && diffD!=5) {
      fromDate = new Date(date.getFullYear() + ',' + (date.getMonth()+1) + ',' + date.getDate());
      diffDates = getMonths(fromDate,toDate);
    }
    return diffDates;
}
/* GET MONTH */
const getMonths = (startDate, endDate) => {
    var resultList = [];
    var date = new Date(startDate);
    var endDate = new Date(endDate);
    //var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthNameList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    while (date <= endDate) {
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var fday = ('0' + firstDay.getDate()).slice(-2);
        var lday = ('0' + lastDay.getDate()).slice(-2)
        var start_date = date.getFullYear()+"-"+monthNameList[date.getMonth()]+"-"+fday+" 00:00:00";
        var end_date = date.getFullYear()+"-"+monthNameList[date.getMonth()]+"-"+lday+" 23:59:59";
        //get first and last day of month
        
        /*resultList.push({
            str: stringDate,
            first: firstDay,
            last: lastDay,
        });*/
        resultList.push({"start_date":start_date,"end_date":end_date})
        date.setMonth(date.getMonth() + 1);
    }
    return resultList;
}
/*CONVERT YEAR AND MONTH*/
const convertYearMonth = (dateOption,fulldate) => {
    var date = new Date(fulldate);
    if(dateOption==5) {
        return ('0' + date.getDate()).slice(-2)+'-'+('0' + (date.getMonth()+Number(1))).slice(-2)+'-'+(date.getFullYear());
    } else {
        var monthNameList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNameList[date.getMonth()]+"-"+date.getFullYear();
    }
    
}