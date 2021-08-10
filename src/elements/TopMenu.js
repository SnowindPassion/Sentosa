import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomLink from "./CustomLink";
import HomeIcon from "./HomeIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopMenu = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <Typography variant="h3" className={classes.title}>
          Moolah Calc
        </Typography>
        <CustomLink to="/BiggestMovers">Biggest Movers</CustomLink>
        <CustomLink to="/History">History</CustomLink>
        <CustomLink to="/Convert">Convert</CustomLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
