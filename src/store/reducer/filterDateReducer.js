import { UPDATE_FILTER_DATE } from "../actionType";

const initialState = {
  from: undefined,
  to: undefined,
  
};

export default function(state = initialState, action) {

  switch (action.type) {
    case UPDATE_FILTER_DATE:
      if (action.payload.from === undefined) {

        return {
          ...state,
          to: action.payload.to
        };
      }
      if (action.payload.to === undefined) {
        return {
          ...state,
          from: action.payload.from
        };
      }
      if (
        action.payload.from !== undefined &&
        action.payload.to !== undefined
      ) {

        return {
          ...state,
          from: action.payload.from,
          to: action.payload.to
        };
      }
    default:
      return state;
  }
}
