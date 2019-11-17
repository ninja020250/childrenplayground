var HOST = "https://capstoneweb.azurewebsites.net";
var PORT = "";
if (process.env.REACT_APP_ENV === "production") {
  HOST = "https://capstoneweb.azurewebsites.net";
  PORT= ''
}

const API = {
  LOGIN: `${HOST}${PORT}/token-auth/`,
  CHECK_TOKEN: `${HOST}${PORT}/api/v1/users/current_user/`,
  GET_IMAGE: `${HOST}${PORT}/api/v1/images/`
};


export {
    API
}