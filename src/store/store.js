import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import promise from "redux-promise-middleware";
import rootReducer from './reducer';
import thunk from "redux-thunk";

const middleware = [thunk]
const initialState = {};

export default createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware, promise()))
);