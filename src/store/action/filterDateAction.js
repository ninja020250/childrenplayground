import { UPDATE_FILTER_DATE } from "../actionType";

export const updateFiltersDate = (from, to) => dispatch => {
  dispatch({
    type: UPDATE_FILTER_DATE,
    payload: {
      from: from,
      to: to
    }
  });
};
