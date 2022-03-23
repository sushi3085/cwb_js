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

// console.log(radar.getXY('121 24.296', '24 38.189'))
// console.log(radar.getXY('121 24.256', '24 37.57'))
// console.log(radar.getXY('121 25.086', '24 38.153'))
// console.log(radar.getXY('121 25.097', '24 37.557'))

console.log(radar.getZR(40));
// console.log(radar.getRZ(50));

async function getRADARData(){
    // 此content之欄位內的格點資料以逗號分隔之浮點數值，每一個數值以科學記號格式記錄，
    // 代表不同經緯度上之雷達回波值，單位為dBZ；其中資料無效值為-99，
    // 雷達觀測範圍外或經資料品管流程移除之資料則以-999表示。經向及緯向解析度均為0.0125度，
    // 每10分鐘更新1筆資料。左下角第一點之座標為東經115.0、北緯18.0，依序先由西向東、再由南往北遞增。使用之座標系統為TWD67。

    // { parameterName: '整合雷達名', radarName: '五分山、花蓮、墾丁、樹林、南屯、林園雷達' },
    // { parameterName: '左下角', parameterValue: '115.0,18.0' },
    // { parameterName: '解析度', parameterValue: '0.0125' },
    // {
    //   parameterName: '時間',
    //   parameterValue: '2022-03-23T19:30:00+08:00'
    // },
    // { parameterName: '維度(nx*ny)', parameterValue: '921*881' },
    // { parameterName: '單位', parameterValue: 'dBZ' }
    let result = null;
    let newArr = [];
    await getJSON(radar.RADARUrl, (err, response)=>{
        result = response['cwbopendata']['dataset']['contents']['content'].split(",");
    });
    for(let i=0; i<result.length; i++){
        result[i] = +result[i];
    }
    while(result.length) newArr.push(result.splice(0,921));// 921raw

    // result = result.split(",");
    // math.reshape(result, [921,881])

    return newArr;
}
async function getRADARRain(){
    // 此content之欄位內的格點資料以逗號分隔之浮點數值，每一個數值以科學記號格式記錄，代表不同經緯度上過去1小時雷達定量降水估計量，單位為mm，
    // 資料無效值為-1，經向及緯向解析度均為0.075度，每1小時更新1筆資料。左下角為第一點東經117.975、北緯19.975，先依次經向遞增，再緯向遞增，為TWD67經緯網格。
    // 本產品係使用即時雷達回波資料依據回波與雨量關係式所推估之格點化雨量，再經散布分布之實際雨量觀測資料校正而來，因此除雨量站位置之格點雨量值為實測外，其餘格點皆為估計值，請謹慎使用。

    // { parameterName: '左下角', parameterValue: '117.975,19.975' },
    // { parameterName: '解析度', parameterValue: '0.075' },
    // {
    //   parameterName: '時間',
    //   parameterValue: '2022-03-23T20:30:00+08:00'
    // },
    // { parameterName: '維度(nx*ny)', parameterValue: '75*95' },
    // { parameterName: '單位', parameterValue: 'mm' }
    let result = null;
    let newArr = [];
    await getJSON(radar.rainUrl, (err, response)=>{
        result = response['cwbopendata']['dataset']['contents']['content'].split(",");
    });
    for(let i=0; i<result.length; i++)
        result[i] = +result[i];
    while(result.length) newArr.push(result.splice(0,75))

    console.log(newArr[5])
    // test newArr
    return newArr;
    // old data forcast 1hr rain fall data
    // https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0046-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&downloadType=WEB&format=JSON
}
let data = getRADARRain();