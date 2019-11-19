// http://capstoneweb.azurewebsites.net/api/v1/images/?minDate=2019-11-17T09:45&maxDate=2019-11-17T09:49
export function formatDateTime(date) {
  var stringDate = date.toJSON();
  var tmp = stringDate.split(":");
  stringDate = tmp[0] + ":" + tmp[1];
  return stringDate;
}

export function toStringDate(date) {
  var d = new Date(date);
  var day = "" + d.getDate();
  var month = "" + (d.getMonth() + 1);
  var year = d.getFullYear();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  return `Ngày: ${day}, Tháng: ${month}, Năm: ${year}, ${hour} Giờ, ${minutes} Phút`;
}

export const getDetectDescription = function(AgePredictions) {
  if (AgePredictions !== undefined) {
    var result = "Phát Hiện Bao Gồm: " + "\n";
    AgePredictions.map(obj => {
      result =
        result +
        `Đối tượng ${obj.age} tuổi, mức độ: ${obj.levelWarning.levelWarningName}` +
        "\n";
    });
    
    return result;
  } else {
    return "";
  }
};
