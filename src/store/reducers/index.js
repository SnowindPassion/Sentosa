import { SET_FROM, SET_TO } from "../actions/actionType";

const initialState = { fromCurrency: "", toCurrency: "" };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FROM:
      return { ...state, fromCurrency: action.data };
    case SET_TO:
      return { ...state, toCurrency: action.data };
    default:
      return state;
  }
};

export default reducer;
