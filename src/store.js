import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import dialogReducer from "./redux/Dialog/dialogReducers";
import authReducer from "./redux/Auth/authReducers";
import errorReducer from "./redux/Error/errorReducer";
import feedReducers from "./redux/Feed/feedReducers";

const middleware = [thunk];

const rootReducer = combineReducers({
  dialog: dialogReducer,
  auth: authReducer,
  error: errorReducer,
  feed: feedReducers,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
