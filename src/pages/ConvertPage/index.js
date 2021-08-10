import React from "react";

import { Grid, Button, Box, TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import { CurrencyContext } from "../../context/CurrencyProvider";
import { getRateBetween2 } from "../../helpers/api";
import PContainer from "../../elements/PContainer";
import biDirectionArrow from "../../elements/svg/bi-directional-arrow.svg";
import Selector from "../../elements/Selector";

const styles = (theme) => ({
  buttonWidth: {
    minWidth: "46px",
    [theme.breakpoints.down("xs")]: {
      transform: "rotate(90deg)",
      maxHeight: "30px",
      margin: "20px",
    },
  },
  selectorWidth: {
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 25px)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  marginBottom: {
    marginBottom: "20px",
  },
});

class ConvertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1, fromCur: "", toCur: "", conversionRate: 1 };
    this.onSwap = this.onSwap.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const fromCur = this.state.fromCur;
    const toCur = this.state.toCur;
    if (!fromCur || !toCur) return;
    if (fromCur === prevState.fromCur && toCur === prevState.toCur) return;
    //console.log({ fromCur, toCur });
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(fromCur);
    const fromCurAbbr = matches[1];
    matches = regExp.exec(toCur);
    const toCurAbbr = matches[1];
    getRateBetween2(fromCurAbbr, toCurAbbr).then((result) => {
      this.setState({ conversionRate: result });
    });
  }

  handleCountChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSwap() {
    const { fromCur, toCur } = this.state;
    this.setState({ fromCur: toCur, toCur: fromCur });
  }

  render() {
    const { classes } = this.props;
    const getCurrencyList = (currencyNames) => {
      return Object.keys(currencyNames).map((key) => {
        return `${currencyNames[key]} (${key})`;
      });
    };
    return (
      <CurrencyContext.Consumer>
        {({ currencyNames }) => (
          <PContainer>
            <Grid container justifyContent="center" direction="column">
              <Grid container item direction="column">
                <h2>Currency Converter Calculator</h2>
                <Grid item md={8}>
                  <TextField
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={this.state.value}
                    onChange={this.handleCountChange}
                    className={classes.marginBottom}
                  />
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.marginBottom}
                  >
                    <Grid item classes={{ root: classes.selectorWidth }}>
                      <Selector
                        id="fromCurrency"
                        value={this.state.fromCur}
                        setValue={(val) => this.setState({ fromCur: val })}
                        currencyList={getCurrencyList(currencyNames)}
                      />
                    </Grid>
                    <Grid item>
                      <Box p="1px">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          classes={{ root: classes.buttonWidth }}
                          onClick={this.onSwap}
                        >
                          <img src={biDirectionArrow} alt="Swap" />
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item classes={{ root: classes.selectorWidth }}>
                      <Selector
                        id="toCurrency"
                        value={this.state.toCur}
                        setValue={(val) => this.setState({ toCur: val })}
                        currencyList={getCurrencyList(currencyNames)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.marginBottom}
                  >
                    <Grid
                      item
                      classes={{ root: classes.selectorWidth }}
                      align="center"
                    >
                      {this.state.value} {this.state.fromCur}
                    </Grid>
                    <Grid
                      item
                      classes={{ root: classes.buttonWidth }}
                      align="center"
                    >
                      =
                    </Grid>
                    <Grid
                      item
                      classes={{ root: classes.selectorWidth }}
                      align="center"
                    >
                      {this.state.value * this.state.conversionRate}{" "}
                      {this.state.toCur}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PContainer>
        )}
      </CurrencyContext.Consumer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ConvertPage);
