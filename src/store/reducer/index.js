import ImageReducer from "./ImageReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import filterDateReducer from "./filterDateReducer";
import filterRangeReducer from "./filterRangeReducer";
import pagiReduder from "./PagiReduder";
import videoListReducer from './videoListReducer'

export default combineReducers({
  user: UserReducer,
  imageList: ImageReducer,
  filterDate: filterDateReducer,
  pagi: pagiReduder,
  filterRange:filterRangeReducer,
  videoList : videoListReducer
});
