import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "unset",
    color: "aliceblue",
    fontSize: '20px',
    marginRight: '50px'
  },
  activeLink: {
    textDecoration: "underline",
  },
}));

const CustomLink = ({ to, children }) => {
  const classes = useStyles();
  return (
    <Button color="inherit">
      <NavLink
        to={to}
        className={classes.link}
        activeClassName={classes.activeLink}
      >
        {children}
      </NavLink>
    </Button>
  );
};

export default CustomLink;
