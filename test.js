var getJSON = require('get-json')

getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&limit=10&offset=0', function (error, response) {
    // response.forEach(function (e, i) {
    // 	pm[i] = [];
    // 	pm[i][0] = e.SiteName;
    // 	pm[i][1] = e['PM2.5'] * 1;
    // 	pm[i][2] = e.PM10 * 1;
    // });
    let records = response['records'];
    console.log(records['weatherElement']['time']['dataTime']);
    // console.log("嘉義市	西區北新里海口寮路56號= " + records['weatherElement']['location'][0]['value']);
});