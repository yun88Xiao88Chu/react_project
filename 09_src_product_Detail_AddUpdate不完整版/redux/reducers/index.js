import { combineReducers } from "redux";

import loginReducer from "./login";
import titleReducer from "./title";
import categoryReducer from "./category";

//属性名和action有关,属性值就是处理对应的reducer
export default combineReducers({
  userInfo: loginReducer,
  title:titleReducer,
  categoryList:categoryReducer
})