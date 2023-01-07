import { combineReducers } from "redux-immutable";

import applicationReducer from "./reducers";

export const configureReducer = () => {
  return combineReducers(applicationReducer);
};
