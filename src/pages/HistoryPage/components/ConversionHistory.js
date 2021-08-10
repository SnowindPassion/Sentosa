import React, { useEffect, useMemo, useContext, useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import { getFromCurrency, getToCurrency } from "../../../store/selectors";
import { CurrencyContext } from "../../../context/CurrencyProvider";

import uuid from "uuid";
import { getConversionRate, getRequiredDates } from "../../../helpers/api";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 180px)",
    overflowY: "scroll",
    border: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "aliceblue",
  },
  checkBox: {
    margin: "-20px",
    transform: "scale(2)",
  },
  noBorder: {
    border: "0px",
  },
  gray: {
    color: "gray",
  },
  chartContainer: {
    justifyContent: "center",
    display: "flex",
  },
}));

const TableCELL = (props) => {
  const classes = useStyles();
  return (
    <TableCell {...props} className={classes.noBorder}>
      {props.children}
    </TableCell>
  );
};

const ConversionHistory = () => {
  const classes = useStyles();
  const fromCurrency = useSelector(getFromCurrency);
  const toCurrency = useSelector(getToCurrency);
  const [historyData, setHistoryData] = useState([]);
  const [chartDomain, setChartDomain] = [0, 0];
  const { conversionHistory, setConversionHistory, currencyNames } =
    useContext(CurrencyContext);

  const dates = useMemo(() => getRequiredDates(), []);

  useEffect(() => {
    const getHistory = async () => {
      //console.log("getHistory Called");
      try {
        const promises = dates.map((date) => {
          if (!conversionHistory[date]) conversionHistory[date] = {};
          if (conversionHistory[date][fromCurrency]) {
            return new Promise((resolve, reject) => {
              resolve(conversionHistory[date][fromCurrency]);
            });
          }
          return getConversionRate(date, fromCurrency);
        });
        const resp = await Promise.all(promises);
        const newConversionHistory = { ...conversionHistory };
        resp.forEach((res, index) => {
          newConversionHistory[dates[index]][fromCurrency] = { ...res };
        });
        setConversionHistory(newConversionHistory);

        const newHistoryData = dates.map((date) => {
          return {
            date,
            value: newConversionHistory[date][fromCurrency][toCurrency],
          };
        });
        setHistoryData(newHistoryData.reverse());
        const values = newHistoryData.map((data) => data.value);
        const newDomain = [Math.min(values), Math.max(values)];
        setChartDomain(newDomain);
      } catch (error) {
        console.error("ConversionHistory", error);
      }
    };
    const len = Object.keys(currencyNames).length;
    //console.log({ len: len, fromCurrency, toCurrency });
    if (!len || !fromCurrency || !toCurrency) setHistoryData([]);
    else getHistory();
  }, [
    fromCurrency,
    toCurrency,
  ]);

  return (
    <>
      {/* Currency History List Data */}
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5">ARS -> BHD</Typography>
        <span className={classes.gray}>Last 30 days</span>
        <Grid item={1} className={classes.container}>
          <Table aria-label="currency table">
            <TableBody>
              {historyData.map(({ date, value }, index) => (
                <TableRow key={uuid()}>
                  <TableCELL align="left">{date}</TableCELL>
                  <TableCELL align="left">{value}</TableCELL>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      {/* Chart */}
      <Grid item md={12} lg={12} className={classes.chartContainer}>
        <ResponsiveContainer width="80%" aspect={4.0 / 2.0}>
          <LineChart width={600} height={300} data={historyData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis domain={chartDomain} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </>
  );
};

export default ConversionHistory;
