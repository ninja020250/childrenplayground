import { FETCH_USER, INIT_USER, UPDATE_USER } from "../actionType";

const initialState = {
  token: "",
  user: {
    username: "",
    email: "",
    fullname: ""
  },
  isRemember: false,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true
      };
    case INIT_USER:
      return {
        ...state,
        token: action.payload.token,
        user: { ...action.payload.user },
        isRemember: action.payload.isRemember,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...action.payload.user },
        loading: false
      };
    default:
      return state;
  }
}
