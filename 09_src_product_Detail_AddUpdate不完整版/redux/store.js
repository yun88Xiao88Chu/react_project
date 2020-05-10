import { createStore,applyMiddleware } from "redux";

import allReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)))