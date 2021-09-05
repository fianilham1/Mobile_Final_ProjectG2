  
import { combineReducers } from "redux"

import pageConfigReducer from "./pageConfigReducers";
import paginationConfigReducer from "./paginationConfigReducers";
import authReducer from "./authReducers";
import serviceAppReducers from "./serviceAppReducers";


export default combineReducers({
    auth:authReducer,
    pageConfig: pageConfigReducer,
    paginationConfig: paginationConfigReducer,
    serviceApp:serviceAppReducers
})