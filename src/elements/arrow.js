import React from 'react'

const downArrowSVG = require("../svg/long-arrow-alt-down-solid.svg");
const upArrowSVG = require("../svg/long-arrow-alt-up-solid.svg");

export const UpArrow = () => (
  <img height="100px" style={{ filter: "opacity(0.3)" }} src={upArrowSVG} alt="Up"/>
);

export const DownArrow = () => (
  <img height="100px" src={downArrowSVG} style={{ filter: "opacity(0.3)" }} alt="Down"/>
);
