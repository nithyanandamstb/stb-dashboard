import React, { useState, useEffect } from 'react';
import { Grid,GridItem,Typography,Box } from '@strapi/design-system';
import {TextAnim} from "text-animations-react"

const CardLayout = (props) => {
    //console.log("log","Card")
    const [today, setToday] = useState(1);
    const [lastWeek, setLastWeek] = useState(0);
    const [lastMonth, setLastMonth] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        if(today==1) {
          setLastWeek(1);
          setToday(0);
          setLastMonth(0);
        } else if(lastWeek==1) {
          setLastWeek(0);
          setToday(0);
          setLastMonth(1);
        } else if(lastMonth==1) {
          setLastWeek(0);
          setToday(1);
          setLastMonth(0);
        }
        //console.log("Today:",today," Week:",lastWeek, " Month:",lastMonth)
      }, 10000);
      return () => clearInterval(interval);
    }, [today, lastWeek, lastMonth]);
    return(
      <>
      {props.cardinfo &&
        <Grid gap={{
          desktop: 5,
          tablet: 2,
          mobile: 1
        }}>
          {props.cardinfo.map((item, idx) => item &&
              <GridItem background="neutral100" padding={1} col={4} s={12}>              
                <Box className="box_row1" padding={4} style={{"background-color":"blue"}} shadow="filterShadow" >
                  <Typography variant="beta"  style={{"color":"white"}}>{item?.card_name}</Typography>
                  <hr />                  
                  {today==1 && item?.data[2] &&
                    <div textColor="neutral0" className="row1" style={{"color":"white"}} >
                      <TextAnim name={item?.data[2].dataLabel+": "+item?.data[2].value}
                      size={2} type="fromtop"
                      color="white"
                      count="infinite"
                      duration={10}/>
                    </div>
                  }
                  {lastWeek==1 && item?.data[1] &&
                    <div textColor="neutral0" className="row1" style={{"color":"white"}} >
                      <TextAnim name={item?.data[1].dataLabel+": "+item?.data[1].value}
                      size={2} type="fromtop"
                      color="white"
                      count="infinite"
                      duration={10}/>
                    </div>
                  }
                  {lastMonth==1 && item?.data[0] &&
                    <div textColor="neutral0" className="row1" style={{"color":"white"}} >
                        <TextAnim name={item?.data[3].dataLabel+": "+item?.data[3].value}
                        size={2} type="fromtop"
                        color="white"
                        count="infinite"
                        duration={10}/>
                    </div>
                  }
                  </Box>
              </GridItem>
          )}
      </Grid>
    }
    </>
    )
};
export default CardLayout;