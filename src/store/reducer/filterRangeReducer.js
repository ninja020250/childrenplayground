import { UPDATE_FILTER_RANGE } from "../actionType";

const initialState = {
  min: undefined,
  max: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_RANGE:
     return {
         ...state,
         min: action.payload.min,
         max: action.payload.max
     }
    default:
      return state;
  }
}
