// var HOST = "https://capstoneweb.azurewebsites.net";
var HOST = "http://capstone16.southeastasia.cloudapp.azure.com";
var PORT = "";
if (process.env.REACT_APP_ENV === "production") {
  HOST = "http://capstone16.southeastasia.cloudapp.azure.com";
  PORT= ''
}

const API = {
  LOGIN: `${HOST}${PORT}/token-auth/`,
  CHECK_TOKEN: `${HOST}${PORT}/api/v1/users/current_user/`,
  GET_IMAGE: `${HOST}${PORT}/api/v1/images/`,
  GET_VIDEO_LIST:`${HOST}${PORT}/api/v1/videos/`,
  GET_STREAM: `${HOST}${PORT}/api/v1/stream`
};

const LEVEL_WARNING = {
  LOW:"Quan ngại sâu sắc",
  MIDDLE: "Nguy hiểm",
  HIGHT: "Nguy hiểm cao"  
}
export {
    API,
    LEVEL_WARNING
}