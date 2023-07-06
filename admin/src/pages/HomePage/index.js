/*
 *
 * HomePage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { BaseHeaderLayout, Box } from '@strapi/design-system';

const HomePage = () => {
  return (
    <Box background="neutral100">
      <BaseHeaderLayout primaryAction={""} secondaryAction={""} title="Dashboard" subtitle="--" as="h2" />
    </Box>
  );
};

export default HomePage;
