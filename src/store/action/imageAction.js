import {
  FETCH_IMAGE,
  FETCH_USER,
  INIT_USER,
  UPDATE_IMAGE,
  UPDATE_USER
} from "../actionType";

import { API } from "../../static/constant";
import axios from "axios";
import { formatDateTime } from "../../common/utilities";
import { httpService } from "../../common/httpService";

export const updateImages = (
  fromDate,
  toDate,
  pagination ,
  callbackSuccess = undefined,
  callbackFail = undefined
) => {
  return dispatch => {
    dispatch({
      type: FETCH_IMAGE,
      payload: null
    });
    if (fromDate === undefined || toDate === undefined) {
       toDate = new Date();
       fromDate = new Date();
       fromDate.setDate(toDate.getDay() - 10);
    }
    var query = `${API.GET_IMAGE}?minDate=${formatDateTime(fromDate)}&maxDate=${formatDateTime(toDate)}&page=${pagination}`;
    httpService
      .get(query)
      .then(res => {
        console.log(res.data);

        dispatch({
          type: UPDATE_IMAGE,
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
