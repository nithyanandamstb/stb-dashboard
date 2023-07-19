/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect,useCallback } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { ContentLayout, Box, EmptyStateLayout, Cross, Button } from '@strapi/design-system';
import RenderChatsCard from "./render";
import Header from "../../components/header"

const HomePage = () => {
  const [dateOption,setDateOption] = useState(1);
  const [time, setTime] = useState(Date.now());
  const DashBoardEnable = process.env.STRAPI_ADMIN_STBDASHBOARD_ENABLE;
  console.log("log",DashBoardEnable)
  useEffect(() => {
    if (window !== undefined) {
      const timer = window.setInterval(() => {
        window.location.reload();
      }, (60000*5));
    
      return () => { 
        window.clearInterval(timer);
      }
    }
  }, []);
  return (
    <>
    {DashBoardEnable ?
      <Box background="neutral100">
        <Header onSelectDate={setDateOption} />
        <RenderChatsCard date_option={dateOption} />
      </Box>
      :
      <Box padding={8} background="neutral100">
      <EmptyStateLayout content="You don't have any Dashboard yet..." action={""} />
      </Box>
    }
    </>
  );
};

export default HomePage;
