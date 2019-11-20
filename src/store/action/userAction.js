import { FETCH_USER, INIT_USER, UPDATE_USER } from "../actionType";

import { API } from "../../static/constant";
import { httpService } from "../../common/httpService";

export const initUser = (
  data,
  callbackSuccess = undefined,
  callbackFail = undefined
) => {
  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: null
    });
    httpService
      .post(API.LOGIN, { ...data })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: INIT_USER,
          payload: {
            ...res.data
          }
        });
        if (callbackSuccess !== undefined) callbackSuccess();
      })
      .catch(err => {
        if (callbackFail !== undefined) callbackFail();
      });
  };
};

export const checkToken = (
  data,
  callbackSuccess = undefined,
  callbackFail = undefined
) => {
  return dispatch => {
    dispatch({
      type: FETCH_USER,
      payload: null
    });
    httpService
      .get(API.CHECK_TOKEN, {})
      .then(res => {
        dispatch({
          type: UPDATE_USER,
          payload: {
            ...res.data
          }
        });
        if (callbackSuccess !== undefined) callbackSuccess();
      })
      .catch(err => {
        if (callbackFail !== undefined) callbackFail();
      });
  };
};

export const userLogout = (callback = undefined) => {
  return dispatch => {
    localStorage.removeItem("token");
    if (callback !== undefined) callback();
  };
};
