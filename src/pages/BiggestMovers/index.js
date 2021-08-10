import React, { useState, useEffect, useContext, useMemo } from "react";
import { Typography, Box, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { getConversionRate } from "../../helpers/api";
import { CurrencyCard } from "./components";
import { CurrencyContext } from "../../context/CurrencyProvider";
import PContainer from "../../elements/PContainer";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    margin: "0px",
    alignSelf: "unset",
  },
  cardContainerGap: {
    gap: "10px",
    marginTop: "30px",
  },
  centerBox: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  headerGray: {
    backgroundColor: `rgb(238,238,238)`,
  },
  fullHeight: {
    height: "100%",
  },
  bolder: {
    fontWeight: "bolder",
  },
  cardContainer: {
    marginTop: "0px",
    marginBottom: "0px",
  },
}));

const BiggestMoversPage = () => {
  const classes = useStyles();
  const { currencyNames } = useContext(CurrencyContext);

  const [count, setCount] = useState(3);
  const [conversionRateInfo, setConversionRateInfo] = useState([]);

  const handleCountChange = (e) => setCount(e.target.value);

  const rateDiff = useMemo(() => {
    const result = [];
    if (!conversionRateInfo.length) return result;
    for (let curName in currencyNames) {
      result.push({
        curName,
        diff: (
          (100.0 * conversionRateInfo[0][curName]) /
            conversionRateInfo[1][curName] -
          100
        ).toPrecision(2),
      });
    }
    result.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
    return result;
  }, [conversionRateInfo, currencyNames]);

  const getData = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayRateInfo = await getConversionRate(
      moment(yesterday).format("YYYY-MM-DD")
    );
    const todayRateInfo = await getConversionRate();
    const rateInfo2 = [todayRateInfo, yesterdayRateInfo];
    setConversionRateInfo(rateInfo2);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <PContainer>
      <Box>
        <Typography variant="h5" className={classes.bolder}>
          Biggest Movers
        </Typography>
        <Typography variant="h6" color="textSecondary">
          since yesterday
        </Typography>
      </Box>
      {/* Select Count */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginTop="40px"
        mb={2}
      >
        <Box mr={1}>
          <Typography variant="h6" color="textSecondary">
            show top
          </Typography>
        </Box>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={count}
          onChange={handleCountChange}
        />
      </Box>
      {/* Show Currency Cards */}
      <Box>
        <Grid container spacing={10} className={classes.cardContainer}>
          {rateDiff &&
            rateDiff
              .slice(0, count)
              .map((info) => (
                <CurrencyCard
                  name={currencyNames[info.curName]}
                  abbr={info.curName}
                  diff={info.diff}
                  todayValue={conversionRateInfo[0][info.curName]}
                  yesterdayValue={conversionRateInfo[1][info.curName]}
                  key={uuidv4()}
                />
              ))}
        </Grid>
      </Box>
    </PContainer>
  );
};

export default BiggestMoversPage;
