import React, { useState, useEffect,useCallback } from 'react';
import { BaseHeaderLayout, Box, ContentLayout, Link } from '@strapi/design-system';
import CustomCss from '../../src/custom.css'
export default function App(props) {
  //console.log("log",props);
  return (    
      <BaseHeaderLayout primaryAction={<Link href={process.env.STRAPI_ADMIN_STBDASHBOARD_SITEURL} isExternal>
      View Site
    </Link>} title="Dashboard" subtitle="--" as="h4" />
  );
}