import { UPDATE_PAGI } from "../actionType";

const initialState = {
  page: undefined,
  pageSize: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGI:
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize
      };

    default:
      return state;
  }
}
