import React, { useState, useEffect } from 'react';
import { Grid,GridItem,Typography } from '@strapi/design-system';
import { Chart } from "react-google-charts";
// import PropTypes from 'prop-types';
import pluginId from '../pluginId';
const GeneralChart = (props) => {
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
          await axios.get(process.env.STRAPI_ADMIN_STBDASHBOARD_APIURL+'/stb-dashboard/form-entry-count',{
            params: {
              model_name: chartinfo?.data?.model_name,
              form_name: chartinfo?.data?.formName,
              date_option: dataVal
            },
          }).then(response => {
                  setChartData(response.data);
                  setIsLoading(false);
          }).catch(error => {
                  console.error(error);
          }); // This is just a sample script. Paste your real code (javascript or HTML) here.
        }
        var renderData = [];
        renderData.push([chartinfo?.options?.hAxis?.title,chartinfo?.options?.vAxis?.title,{ role: "style" }, { role: "annotation"}]);
        if(chartData) {
          const sortedDatAsc = chartData.sort( (a,b) => b.id - a.id );
          if(sortedDatAsc) {
            sortedDatAsc.map((item,i)=>{                
              renderData.push([item?.date,item?.value,chartinfo?.data?.color,item?.value]);
            });
          }            
        }
        //console.log("log renderdata",[renderData]);
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

export default GeneralChart;