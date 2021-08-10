import React from "react";
import { Grid } from "@material-ui/core";
import PContainer from "../../elements/PContainer";
import SelectTable from "./components/SelectTable";
import ConversionHistory from "./components/ConversionHistory";

const HistoryPage = () => {
  return (
    <PContainer>
      <Grid container spacing={3}>
        <SelectTable />
        <ConversionHistory />
      </Grid>
    </PContainer>
  );
};

export default HistoryPage;
