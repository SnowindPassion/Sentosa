import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: "0px",
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

export default TableCELL;