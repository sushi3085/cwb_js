var getJSON = require('get-json')
var fs = require('fs');

// getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&limit=10&offset=0', function (error, response) {
//     // response.forEach(function (e, i) {
//     // 	pm[i] = [];
//     // 	pm[i][0] = e.SiteName;
//     // 	pm[i][1] = e['PM2.5'] * 1;
//     // 	pm[i][2] = e.PM10 * 1;
//     // });
//     let records = response['records'];
//     console.log(records['weatherElement']['time']['dataTime']);
//     // console.log("嘉義市	西區北新里海口寮路56號= " + records['weatherElement']['location'][0]['value']);
// });
function getEach5Second() {
    getJSON("https://api.wheretheiss.at/v1/satellites/25544", function (error, response) {
        console.dir(response);
        if (error !== null) console.log(error);
        console.log(Math.random());
    });
    setTimeout(getEach5Second, 5 * 1000);
}
function getData(){
    let url = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0059-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&downloadType=WEB&format=JSON"
    getJSON(url, (err, data)=>{
        // if(err !== null) console.log(err);
        // else console.dir(data['cwbopendata']['dataset']['contents']['content']);
        let arr = data['cwbopendata']['dataset']['contents']['content'].split(",");
        console.log(+arr[0]);
        console.log(typeof +arr[0]);
    });
}

// getData();

// make a function that read files from local
async function maniData(){
	let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&limit=10&offset=0"
	let data;
	await getJSON(url, function(error, response){
		data = response;
	});
	let originalContent = fs.readFileSync('datas');
	fs.writeFileSync('datas', originalContent+(data['records']['weatherElement']['location'][0]['value'])+"\n");

	setTimeout(maniData, 2000);
}
// maniData();

var radar = require('./getRADAR.js')

console.log(radar.getXY('121 24.296', '24 38.189'))
console.log(radar.getXY('121 24.256', '24 37.57'))
console.log(radar.getXY('121 25.086', '24 38.153'))
console.log(radar.getXY('121 25.097', '24 37.557'))