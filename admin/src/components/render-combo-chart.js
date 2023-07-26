import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import pluginId from '../pluginId';
const ComboChart = (props) => {
    //console.log("log",props)
    if(props && props?.chartinfo) {
        const chartinfo = props?.chartinfo;
        const options = chartinfo?.options;
        const [chartData,setChartData] = useState([]);
        const [dateOption,setDateOption] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const fetchFormBoard = async (dataVal) => {
          //console.log("log dataoption","Loading...."+dataVal)
          if(isLoading===false) setIsLoading(true);
          const axios = require('axios');
          await axios.get(process.env.STRAPI_ADMIN_STBDASHBOARD_APIURL+'/stb-dashboard/combo-properties-count',{
            params: {
                model_name: chartinfo?.data?.model_name,
                search_type: chartinfo?.data?.search_type,
                department: chartinfo?.data?.department,
                status: chartinfo?.data?.status,
                date_option: dataVal
            },
          }).then(response => {
                  //console.log("log data", response.data);
                  setChartData(response.data);
                  setIsLoading(false);
          }).catch(error => {
                  console.error(error);
          }); // This is just a sample script. Paste your real code (javascript or HTML) here.
        }
        var renderData = [];
        //renderData.push([chartinfo?.options?.hAxis?.title,chartinfo?.options?.vAxis?.title,{ role: "style" }, { role: "annotation"}]);
        if(chartData) {
          var clabel = chartData?.label;
          var cdata = chartData?.data;
          console.log("log",chartData?.data)
          if(cdata && clabel) {
            console.log("log",chartData)
            renderData.push(clabel);
            const sortedDatAsc = cdata.sort( (a,b) => b.id - a.id );
            if(sortedDatAsc) {
              sortedDatAsc.map((item,i)=>{
                let subData = [item?.date];
                chartData?.label.map((sitem,i)=>{
                  if(sitem!="Month") {
                    subData.push(item[sitem]);
                  }                  
                });
                renderData.push(subData)
              });
            }
          }          
        }
        console.log("log",renderData)
        /*renderData.push(["Status","Count"]);
        //console.log("log",chartData);
        if(chartData) {
            chartData.map((item,i)=>{
                renderData.push([item?.status,item?.value]);
            });
        }*/
        //console.log("log renderdata",renderData);
        useEffect(async () => {
            if(dateOption!=props.date_option) {
                setDateOption(props.date_option);
                await fetchFormBoard(props.date_option);
            }   
        }, [props]);
      return (
        <>
        {renderData &&
          <Chart
            chartType={chartinfo?.data?.chartType}
            width="100%"
            height= "400px"
            data={renderData}
            options={options}
          />
        }
        </>
      );        
    }
};

export default ComboChart;
