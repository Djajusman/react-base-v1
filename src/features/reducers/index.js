import sidebarReducer from "./sidebar";
import loggedReducer from "./isLogged";
import authReducer from "../../features/auth/authSlice";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  siderbar: sidebarReducer,
  isLogged: loggedReducer,
  auth: authReducer,
});

export default allReducers;
