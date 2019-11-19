import {
  FETCH_IMAGE,
  FETCH_USER,
  INIT_USER,
  UPDATE_IMAGE,
  UPDATE_USER
} from "../actionType";
import { convertUTCDate, formatDateTime } from "../../common/utilities";

import { API } from "../../static/constant";
import axios from "axios";
import { httpService } from "../../common/httpService";

export const updateImages = (
  fromDate,
  toDate,
  pagination,
  min = undefined,
  max = undefined,
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
    toDate = convertUTCDate(toDate);
    fromDate = convertUTCDate(fromDate);
    
    var query = `${API.GET_IMAGE}`;
    var queryDate = `minDate=${formatDateTime(fromDate)}&maxDate=${formatDateTime(toDate)}&page=${pagination}`;
    var queryRange =  "";
    query = query + "?"+ queryDate;
    if(min !== undefined && max === undefined){
      queryRange = `&minAge=${min}&maxAge=${100}`;
      query = query + queryRange;
    }else if ( max !== undefined && min === undefined){
      queryRange = `&maxAge=${max}&minAge=${1}`;
      query = query + queryRange;
    }else if(min !== undefined && max !== undefined){
      queryRange = `&maxAge=${max}&minAge=${min}`;
      query = query + queryRange;
    }
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
