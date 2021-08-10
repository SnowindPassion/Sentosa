import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px 20px",
    fontWeight: "900",
    overflow: "hidden",
  },
}));

const PContainer = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Container className={classes.container} {...rest}>
      {children}
    </Container>
  );
};

export default PContainer;
