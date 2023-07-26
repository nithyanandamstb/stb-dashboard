import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, BaseCheckbox, Typography,VisuallyHidden } from '@strapi/design-system';

const TableBoard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTabledData] = useState([]);  
  var fields_arr = props?.tableinfo?.fields.split(",");

  const getTableValues = async () => {
    const search_type = props?.tableinfo?.search_type;  
    const model_name = props?.tableinfo?.model_name;
    const fields = props?.tableinfo?.fields;    
    const limit = props?.tableinfo?.limit;
    if(isLoading===false) setIsLoading(true);
    const axios = require('axios');
    await axios.get('/stb-dashboard/get_latest_activite_properties',{
      params: { search_type: search_type,  model_name: model_name, limit:limit, fields:fields }
    }).then(response => {
        setTabledData(response.data);
        setIsLoading(false);
    }).catch(error => {
        console.error(error);
    });
  }
  useEffect(async () => {
    await getTableValues();
  }, []);
  return (
    <>
    {tableData &&
    
    <div  style={{"text-align":"center"}}>
    <Typography variant="beta">{props?.tableinfo?.tableName}</Typography>
    <Table>
    <Thead>
       <Tr>
          {fields_arr && fields_arr?.map((field,idx)=> field &&
          <Th>
             <Typography variant="sigma">{field}</Typography>
          </Th>
          )}
       </Tr>
    </Thead>
    <Tbody>
       <>
       {tableData && tableData?.map((fieldvalue, idx) => fieldvalue && 
       <Tr>
          {fields_arr && fields_arr?.map((field,idx)=> field &&
          <Td>
             <Typography variant="neutral800">{fieldvalue[field]}</Typography>
          </Td>
          )}
       </Tr>
       )}
       </>
    </Tbody>
    </Table>
    </div>
    }
    </>
  )
};
export default TableBoard;
