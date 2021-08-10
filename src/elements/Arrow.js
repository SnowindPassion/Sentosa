import React from "react";

import downArrowSVG from "../elements/svg/long-arrow-alt-down-solid.svg";
import upArrowSVG from "../elements/svg/long-arrow-alt-up-solid.svg";

export const UpArrow = () => (
  <img
    height={100}
    style={{ filter: "opacity(0.3)" }}
    src={upArrowSVG}
    alt="Up"
  />
);

export const DownArrow = () => (
  <img
    height={100}
    src={downArrowSVG}
    style={{ filter: "opacity(0.3)" }}
    alt="Down"
  />
);
