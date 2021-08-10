import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Checkbox,
  Typography,
} from "@material-ui/core";
import uuid from "uuid";
import { CurrencyContext } from "../../../context/CurrencyProvider";
import { makeStyles } from "@material-ui/core/styles";
import { getSetFromAction, getSetToAction } from "../../../store/actions";
import { getFromCurrency, getToCurrency } from "../../../store/selectors";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "calc(100vh - 180px)",
    overflowY: "scroll",
    overflowX: "hidden",
    border: "1px solid rgba(224, 224, 224, 1)",
    backgroundColor: "aliceblue",
    flexDirection: "column",
  },
  tableCaption: {
    display: "flex",
    justifyContent: "space-between",
  },
  checkBox: {
    margin: "-20px",
    transform: "scale(2)",
  },
  fromTo: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "25px",
  },
  tableCellBorder: {
    borderBottom: "0px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
    minWidth: "35px",
  },
  gray: {
    color: "gray",
  },
}));

const TableCellSelect = ({ currency, selected, setSelected }) => {
  const classes = useStyles();
  const [mouseOver, setMouseOver] = useState(false);
  const handleChange = (event) => {
    if (event.target.checked) setSelected(currency);
    else setSelected("");
  };

  const onMouseOver = (e) => {
    setMouseOver(true);
  };

  const onMouseLeave = (e) => {
    setMouseOver(false);
  };

  return (
    <TableCell
      align="center"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className={classes.tableCellBorder}
    >
      {(mouseOver || selected === currency) && (
        <Checkbox
          checked={selected === currency}
          color="primary"
          onChange={handleChange}
          className={classes.checkBox}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      )}
    </TableCell>
  );
};
const SelectTable = () => {
  const classes = useStyles();
  const { currencyNames } = useContext(CurrencyContext);
  const dispatch = useDispatch();
  const setFrom = (currency) => dispatch(getSetFromAction(currency));
  const setTo = (currency) => dispatch(getSetToAction(currency));
  const fromCurrency = useSelector(getFromCurrency);
  const toCurrency = useSelector(getToCurrency);

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Typography variant="h5">Conversion History</Typography>
      <Grid item className={classes.fromTo}>
        <span className={classes.gray}>From</span>
        <span className={classes.gray}>To</span>
      </Grid>
      <Grid item container className={classes.container}>
        <Table aria-label="currency table" className={classes.backgroundColor}>
          <TableBody>
            {Object.keys(currencyNames).map((abbr, index) => (
              <TableRow key={uuid()}>
                <TableCellSelect
                  selected={fromCurrency}
                  setSelected={setFrom}
                  currency={abbr}
                />
                <TableCell align="center" className={classes.tableCellBorder}>
                  {currencyNames[abbr]}
                </TableCell>
                <TableCellSelect
                  selected={toCurrency}
                  setSelected={setTo}
                  currency={abbr}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default SelectTable;
