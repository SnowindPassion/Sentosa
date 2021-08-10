import React, { useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const Selector = ({ label, value, setValue, currencyList, id }) => {
  const [val, setVal] = useState("");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      inputValue={val}
      onInputChange={(event, newInputValue) => setVal(newInputValue)}
      options={currencyList}
      getOptionLabel={(option) => option ?? ""}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default Selector;
