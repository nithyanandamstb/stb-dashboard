/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { ContentLayout, Box } from '@strapi/design-system';
import RenderChats from "./render";
import Header from "../../components/header"

const HomePage = () => {
  return (
    <Box background="neutral100">
      <Header />
      <RenderChats date_option={1} />
    </Box>
  );
};

export default HomePage;
