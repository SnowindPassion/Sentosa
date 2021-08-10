import React, { useState, useEffect } from "react";
import { getCurrencyNames } from "../helpers/api";

const CurrencyContext = React.createContext({});

const CurrencyProvider = (props) => {
  const [currencyNames, setCurrencyNames] = useState({});
  const [conversionHistory, setConversionHistory] = useState({});
  
  useEffect(() => {
    try {
      getCurrencyNames().then(curNames => {
        setCurrencyNames(curNames);
      });
    } catch (error) {
      console.error('GetCurrencyNames', error);
    }
  }, [])
  return (
    <CurrencyContext.Provider value={{currencyNames, setCurrencyNames, conversionHistory, setConversionHistory}}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
