import React, { useState, useEffect,useCallback } from 'react';
import { BaseHeaderLayout, Box, ContentLayout } from '@strapi/design-system';
import CustomCss from '../../src/custom.css'
export default function App(props) {
  //console.log("log",props);
  const [dateOption,setDateOption] = useState(1);
  return (    
      <BaseHeaderLayout primaryAction={""} title="Dashboard" subtitle="--" as="h4" />
  );
}