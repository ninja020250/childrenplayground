import {
    FETCH_USER,
    FETCH_VIDEO,
    INIT_USER,
    UPDATE_USER,
    UPDATE_VIDEO
} from "../actionType";

import { API } from "../../static/constant";
import axios from "axios";
import { formatDateTime } from "../../common/utilities";
import { httpService } from "../../common/httpService";

export const updateVideos = (
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
        type: FETCH_VIDEO,
        payload: null
      });
      if (fromDate === undefined || toDate === undefined) {
         toDate = new Date();
         fromDate = new Date();
         fromDate.setDate(toDate.getDay() - 10);
      }
      var query = `${API.GET_VIDEO_LIST}`;
    //   var queryDate = `minDate=${formatDateTime(fromDate)}&maxDate=${formatDateTime(toDate)}&page=${pagination}`;
    //   var queryRange =  "";
    //   query = query + "?"+ queryDate;
    //   if(min !== undefined && max === undefined){
    //     queryRange = `&minAge=${min}&maxAge=${100}`;
    //     query = query + queryRange;
    //   }else if ( max !== undefined && min === undefined){
    //     queryRange = `&maxAge=${max}&minAge=${1}`;
    //     query = query + queryRange;
    //   }else if(min !== undefined && max !== undefined){
    //     queryRange = `&maxAge=${max}&minAge=${min}`;
    //     query = query + queryRange;
    //   }
      httpService
        .get(query)
        .then(res => {
          console.log(res.data);
  
          dispatch({
            type: UPDATE_VIDEO,
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
  