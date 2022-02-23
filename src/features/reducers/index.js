import sidebarReducer from "./sidebar";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    siderbar : sidebarReducer,
    isLogged : loggedReducer
})

export default allReducers