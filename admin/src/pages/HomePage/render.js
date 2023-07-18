import React, { useState, useEffect } from 'react';
import { Grid,GridItem,Typography } from '@strapi/design-system';
import GeneralChart from "../../components/render-general-chart";
import PieChart from "../../components/render-pie-chart";
import ComboChart from "../../components/render-combo-chart";
import RenderCards from "../../components/render-cards";
import ChartsHeader from "../../components/chart-header"

const DashBoard = (props) => {
    const [dateOption,setDateOption] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [chartConfigJson, setChartConfigJson] = useState([]);
    const getCharsAndCards = async () => {
        if(isLoading===false) setIsLoading(true);
        const axios = require('axios');
        await axios.get(process.env.STRAPI_ADMIN_STBDASHBOARD_APIURL+'/stb-dashboard/get-charts',{}).then(response => {
            setChartConfigJson(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
        });
    }
    useEffect(async () => {
        await getCharsAndCards();
    }, [props]);
    return(
        <>
        {chartConfigJson ?
            <>
            {chartConfigJson.map((item, idx) => item && item?.Enabled==true && item?.Board_Type=="Card" && item?.Options &&
                <RenderCards cardinfo={item?.Options} date_option={props.date_option}/>
            )}
            <ChartsHeader onSelectDate={setDateOption} />
            <Grid gap={{
                desktop: 5,
                tablet: 2,
                mobile: 1
            }}>
                
            {chartConfigJson.map((item, idx) => item && item?.Enabled==true && item?.Board_Type=="Chart" && item?.Options &&
                <>
                {item?.Options?.data?.type=="properties" && item?.Options?.data?.chartType=="PieChart" &&
                    <GridItem background="neutral100" padding={1} col={item?.Options?.data?.column ? item?.Options?.data?.column:6} s={12}>
                        <PieChart chartinfo={item?.Options} date_option={dateOption}/>
                    </GridItem>
                }
                {item?.Options?.data?.type=="properties" && item?.Options?.data?.chartType=="ComboChart" &&
                    <GridItem background="neutral100" padding={1} col={item?.Options?.data?.column ? item?.Options?.data?.column:6} s={12}>
                        <ComboChart chartinfo={item?.Options} date_option={dateOption}/>
                    </GridItem>
                }
                {item?.Options?.data?.type=="stb_forms" &&
                    <GridItem background="neutral100" padding={1} col={item?.Options?.data?.column ? item?.Options?.data?.column:6} s={12}>
                        <GeneralChart chartinfo={item?.Options} date_option={dateOption}/>
                    </GridItem>
                }
                </>
            )}
            </Grid>
            </>
            :
            <>Chart Content type data is empty</>
        }
         </>
    )
};

export default DashBoard;