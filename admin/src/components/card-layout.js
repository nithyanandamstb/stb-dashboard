import React, { useState, useEffect } from 'react';
import { Grid,GridItem,Typography,Box } from '@strapi/design-system';
import {TextAnim} from "text-animations-react"

const CardLayout = (props) => {
    //console.log("log","Card")
    const cardinfo = props.cardinfo;
    const sc = props.soruce_cardinfo;
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
      }, 3000);
      return () => clearInterval(interval);
    }, [today, lastWeek, lastMonth]);
    var defaultCol = 6;
    if(cardinfo && cardinfo.length>2) {
      defaultCol = Math.floor(12/parseInt(cardinfo.length));
    }    
    return(
      <>
      {cardinfo &&
        <Grid gap={{
          desktop: 5,
          tablet: 2,
          mobile: 1
        }}>
          {cardinfo.map((item, idx) => item &&
              <GridItem background="neutral100" padding={1} col={defaultCol} s={12}>
                
                <Box className="box_row" padding={4} style={{"background-color":sc[sc.findIndex(si => si.formName === item?.card_name)]?.color}} shadow="filterShadow" >
                  <Typography variant="omega" fontWeight="semiBold"  style={{"color":sc[sc.findIndex(si => si.formName === item?.card_name)]?.fontColor}}>{sc[sc.findIndex(si => si.formName === item?.card_name)]?.cardName}</Typography>
                  <hr />
                  <p>{}</p>
                  {today==1 && item?.data[2] &&
                    <div textColor="neutral0" className="box_row_item">
                      <TextAnim name={item?.data[2].dataLabel+": "+item?.data[2].value}
                      size={1} type="flip"
                      color={sc[sc.findIndex(si => si.formName === item?.card_name)]?.fontColor}
                      count="2"
                      duration={2}/>
                    </div>
                  }
                  {lastWeek==1 && item?.data[1] &&
                    <div textColor="neutral0" className="box_row_item">
                      <TextAnim name={item?.data[1].dataLabel+": "+item?.data[1].value}
                      size={1} type="flip"
                      color={sc[sc.findIndex(si => si.formName === item?.card_name)]?.fontColor}
                      count="2"
                      duration={2}/>
                    </div>
                  }
                  {lastMonth==1 && item?.data[0] &&
                    <div textColor="neutral0" className="box_row_item">
                        <TextAnim name={item?.data[0].dataLabel+": "+item?.data[0].value}
                        size={1} type="flip"
                        color={sc[sc.findIndex(si => si.formName === item?.card_name)]?.fontColor}
                        count="2"
                        duration={2}/>
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