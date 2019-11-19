import { UPDATE_FILTER_RANGE } from "../actionType";

export const updateFiltersRange = (min, max) => dispatch => {
  dispatch({
    type: UPDATE_FILTER_RANGE,
    payload: {
      min: min,
      max: max
    }
  });
};

export const resetFiltersRange = () => dispatch => {
  dispatch({
    type: UPDATE_FILTER_RANGE,
    payload: {
      min: undefined,
      max: undefined
    }
  });
};
