import React, { useState, useEffect } from 'react';
import CardLayout from './card-layout';

const CardBoard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  var form_name = [];
  if(props.cardinfo) {
    props.cardinfo.map((item, idx) => {
      if(item?.formName && item?.cardName && item?.enabled==true && item?.model_name) {
        //form_name.push({"form_name":item?.formName,"model_name":item?.model_name});
        form_name.push(item?.formName)
      }      
    })
  }
  //console.log("log",form_name)

  const getCardValues = async (form_name) => {    
    if(isLoading===false) setIsLoading(true);
    const axios = require('axios');
    await axios.get('/stb-dashboard/get-card-values',{
      params: { form_name: form_name.join(","),  model_name: "plugin::stb-forms.stb-form"}
    }).then(response => {
      setCardData(response.data);
        setIsLoading(false);
    }).catch(error => {
        console.error(error);
    });
  }
  useEffect(async () => {
    if(cardData.length==0) {
      await getCardValues(form_name);
    }      
  }, [form_name,cardData]);
  return (
    <>
    {cardData &&
      <CardLayout cardinfo={cardData} soruce_cardinfo={props.cardinfo} />
    }
    </>
  )
};
export default CardBoard;
