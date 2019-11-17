// http://capstoneweb.azurewebsites.net/api/v1/images/?minDate=2019-11-17T09:45&maxDate=2019-11-17T09:49
export function formatDateTime(date){
    var stringDate = date.toJSON();
    var tmp =  stringDate.split(':');
    stringDate = tmp[0] +":"+ tmp[1]
    return stringDate;
}