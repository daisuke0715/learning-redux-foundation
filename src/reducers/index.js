import { combineReducers } from "redux"
import counterReducer from "./counter";
import isLoginReducer from "./isLogin";

const reducers = combineReducers({
  counter: counterReducer,
  login: isLoginReducer,
});

console.dir(reducers);

export default reducers;
