import { UPDATE_PAGI } from "../actionType";

export const updatePagination = (page, pageSize=10) => dispatch => {
  dispatch({
    type: UPDATE_PAGI,
    payload: {
        page: page,
        pageSize: pageSize
    }
  });
};
