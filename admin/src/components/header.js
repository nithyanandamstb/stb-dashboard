import React, { useState, useEffect,useCallback } from 'react';
import { BaseHeaderLayout, Box, ContentLayout } from '@strapi/design-system';
import CustomCss from '../../src/custom.css'
export default function App() {
  const [dateOption,setDateOption] = useState(1);
  return (    
      <BaseHeaderLayout primaryAction={
        <Select
        optionData={[
          { value: "1", text: "Last 12 Months" },
          { value: "2", text: "Last 6 Months" },
          { value: "3", text: "Last 3 Months" },
          { value: "4", text: "Last 30 days" },
          { value: "5", text: "Last 7 days" },
        ]}
        onChange={(data) => {console.log("log",data); setDateOption(data?.value)}}
      />
      } title="Dashboard" subtitle="--" as="h2" />
  );
}

const createChangeHandler = (callback) => (event) => {
  if (typeof callback === "function") {
    const select = event.target;
    const selectedIndex = select.selectedIndex;
    const selectedOption = select.options[selectedIndex];
    const value = selectedOption.value;
    const text = selectedOption.innerText;
    callback({ value, text });
  }
};

function Select(props) {
  const { optionData, onChange: _onChange } = props;
  const onChange = useCallback(createChangeHandler(_onChange), [_onChange]);
  return (
    <select id='top-select-option' onChange={onChange}>
      {optionData.map((data) => {
        const { value, text } = data;
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  );
}