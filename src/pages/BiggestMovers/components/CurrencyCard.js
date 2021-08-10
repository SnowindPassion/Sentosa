import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from "@material-ui/core";
import { UpArrow, DownArrow } from "../../../elements/arrow";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px 20px",
    fontWeight: "900",
  },
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
    paddingRight: "40px",
    paddingLeft: "40px",
    flexWrap: 'wrap'
  },
  headerGray: {
    backgroundColor: `rgb(238,238,238)`,
    paddingRight: "40px",
    paddingLeft: "40px",
  },
  fullHeight: {
    height: "100%",
  },
}));

const CurrencyCard = ({ name, abbr, yesterdayValue, todayValue, diff }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card classes={{ root: classes.fullHeight }}>
        <CardHeader
          classes={{ action: classes.cardHeader, root: classes.headerGray }}
          action={
            <Typography
              variant="h5"
              color="textSecondary"
              fontWeight="fontWeightBold"
            >
              {abbr}
            </Typography>
          }
          title={name}
          subheader="Conversion to USD"
        />
        <CardContent classes={{ root: classes.centerBox }}>
          <Box flex={1} display="flex" alignItems="center">
            {diff >= 0 ? <UpArrow /> : <DownArrow />}
            <Typography variant="h4" color="textSecondary">
              {" "}
              {Math.abs(diff)}%
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignContent="space-between" flexWrap="wrap">
              <Box flex="1" mr={1}>
                <Typography variant="h6" color="textSecondary" mr={1}>
                  yesterday
                </Typography>
              </Box>
              <Box flex="1">
                <Typography variant="h6">{yesterdayValue}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignContent="space-between" flexWrap="wrap">
              <Box flex="1" mr={1}>
                <Typography variant="h6" color="textSecondary">
                  today
                </Typography>
              </Box>
              <Box flex="1">
                <Typography variant="h6">{todayValue}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CurrencyCard;
