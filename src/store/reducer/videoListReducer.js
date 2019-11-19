import { FETCH_VIDEO, UPDATE_VIDEO } from "../actionType";

const initialState = {
  data: {
    count: undefined,
    next: undefined,
    previous: undefined,
    results: []
  },
  loading: false
};
// "videoId": 6,
// "videoLink": "https://res.cloudinary.com/lin2hs/video/upload/v1574003384/data/PipFilm_ubw3lf.mp4",
// "createdTime": "2019-11-17T15:10:14.973000Z",
// "updatedTime": "2019-11-17T15:10:14.973000Z",
// "videoStatus": true,
// "videoHistories": [
//     {
//         "videoHistoryId": 5,
//         "videoStatus": true,
//         "createdTime": "2019-11-17T15:10:15.037000Z"
//     }
// ]
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEO:
      return {
        ...state,
        loading: true
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        data: {...action.payload},
        loading: false
      };
    default:
      return state;
  }
}
