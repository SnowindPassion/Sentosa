import moment from "moment";
import axios from "axios";

export const getCurrencyNames = async () => {
  try {
    const resp = await axios.get(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    );
    const result = resp.data;
    return result;
  } catch (error) {
    console.error("Error occured in fetching currency Names : ", error);
  }
};

export const getConversionRate = async (date, currency = "usd") => {
  try {
    const dateStr = date ?? "latest";
    const resp = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${dateStr}/currencies/${currency}.json`
    );
    const result = resp.data[currency];
    return result;
  } catch (error) {
    console.error("Error occured in getConversionRate function : ", error);
  }
};

export const getRateBetween2 = async (fromCur, toCur) => {
  try {
    const resp = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCur}/${toCur}.json`
    );
    const result = resp.data[toCur];
    return result;
  } catch (error) {
    console.error("Error occured in getConversionRate function : ", error);
  }
};

export const getRequiredDates = () => {
  const dates = ["latest"],
    yesterday = new Date();
  for (let i = 1; i < 30; ++i) {
    yesterday.setDate(yesterday.getDate() - 1);
    dates.push(moment(yesterday).format("YYYY-MM-DD"));
  }
  return dates;
};
