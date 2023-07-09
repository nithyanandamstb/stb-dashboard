import React, { useState, useEffect } from 'react';
import { Grid,GridItem,Typography } from '@strapi/design-system';
import RenderFormsChart from "../../components/render-forms-chart";
import RenderPropertiesChart from "../../components/render-properties-chart";

const FormBoard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [chartConfigJson, setChartConfigJson] = useState([]);
    const getChars = async () => {
        if(isLoading===false) setIsLoading(true);
        const axios = require('axios');
        await axios.get('http://localhost:1337/stb-dashboard/get-charts',{}).then(response => {
            setChartConfigJson(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
        });
    }
    useEffect(async () => {
        //if(dateOption!=props.date_option) {
            //setDateOption(props.date_option);
            await getChars();
        //}
    }, [props]);
    return(
        <>
        {chartConfigJson ?
            <Grid gap={{
                desktop: 5,
                tablet: 2,
                mobile: 1
            }}>
                {chartConfigJson.map((item, idx) => item && item?.Enabled==true && item?.Options &&
                    <GridItem background="neutral100" padding={1} col={6} s={12}>
                    {item?.Options?.data?.type=="properties" &&
                      <RenderPropertiesChart chartinfo={item?.Options} date_option={props.date_option}/>
                    }
                    {item?.Options?.data?.type=="stb_forms" &&
                      <RenderFormsChart chartinfo={item?.Options} date_option={props.date_option}/>
                    }
                    </GridItem>
                )}
            </Grid>
            :
            <>Chart Content type data is empty</>
        }
         </>
    )
};

export default FormBoard;