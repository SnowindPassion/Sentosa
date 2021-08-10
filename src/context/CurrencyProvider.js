import React, { useState, useEffect } from "react";
import { getCurrencyNames } from "../helpers/api";

const CurrencyContext = React.createContext({});

const CurrencyProvider = ({ children }) => {
  const [currencyNames, setCurrencyNames] = useState({});
  const [conversionHistory, setConversionHistory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curNames = await getCurrencyNames();
        setCurrencyNames(curNames);
      } catch (error) {
        console.error("GetCurrencyNames", error);
      }
    };

    fetchData();
  }, []);
  return (
    <CurrencyContext.Provider
      value={{
        currencyNames,
        setCurrencyNames,
        conversionHistory,
        setConversionHistory,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
