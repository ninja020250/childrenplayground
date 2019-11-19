import { FETCH_IMAGE, UPDATE_IMAGE } from "../actionType";

const initialState = {
  data: {
    count: undefined,
    next: undefined,
    previous: undefined,
    results: []
  },
  loading: false
};
// {
//     "imageId": 2,
//     "imageLink": "https://raw.githubusercontent.com/BoyuanJiang/Age-Gender-Estimate-TF/master/demo/demo2.jpg",
//     "createdTime": "2019-11-11T16:13:37.097000Z",
//     "updatedTime": "2019-11-11T16:13:37.097000Z",
//     "imageStatus": true,
//     "imageHistories": [
//         {
//             "imageHistoryId": 2,
//             "imageStatus": true,
//             "createdTime": "2019-11-11T16:13:37.577000Z"
//         }
//     ],
//     "agePredictions": [
//         {
//             "levelWarning": {
//                 "levelWarningName": "Semi-Dangerous",
//                 "levelWarningMinAge": 11,
//                 "levelWarningMaxAge": 18,
//                 "createdTime": "2019-11-11T00:00:00Z"
//             },
//             "age": 12
//         },
//         {
//             "levelWarning": {
//                 "levelWarningName": "Dangerous",
//                 "levelWarningMinAge": 19,
//                 "levelWarningMaxAge": 100,
//                 "createdTime": "2019-11-11T00:00:00Z"
//             },
//             "age": 21
//         }
//     ]
// }
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        data: {...action.payload},
        loading: false
      };
    default:
      return state;
  }
}
