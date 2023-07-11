/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect,useCallback } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { ContentLayout, Box } from '@strapi/design-system';
import RenderChatsCard from "./render";
import Header from "../../components/header"

const HomePage = () => {
  const [dateOption,setDateOption] = useState(1);
  console.log("log","DashBoard")
  return (
    <Box background="neutral100">
      <Header onSelectDate={setDateOption} />
      <RenderChatsCard date_option={dateOption} />
    </Box>
  );
};

export default HomePage;
