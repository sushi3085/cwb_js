var linebot = require('linebot')
var express = require('express')
var getJSON = require('get-json')
const MSGS = require('./msgs.js');

var bot = linebot({
	"channelId": "1656918423",
	"channelSecret": "bf5dd4e6a1bfe57aa6a8973ec0c72a56",
	"channelAccessToken": "XNUj1qPi/SwRUhXP0HqAlLcP1J3efxOF6SK5eTBhDwxP4oHWYAVSWKOfuE1KZUxO51bRlcy442SS+DwvF9wpA86ug+suW+MLCgeW/VWoKe7Ts9N3T4YjFUfvY+M2pliKPH5HYNhNq/N8yHBIJYYfZAdB04t89/1O/w1cDnyilFU="
});


const app = express();
const linebotParser = bot.parser();
var timer; // interval object in order to count down;
var answer = 00;

var sixtyMinCountDown = 60;
var users = []


function replyMessage(event) {
	// 將文字與影像訊息分開處理
	// console.log(event); //把收到訊息的 event 印出來看看
	if (event.message.type == 'text') {
		let msg = event.message.text;
		let response = "";

		// event.reply(msg).
		// 	then(function (data) {
		// 		console.log(msg);
		// 	}).catch(function (err) {
		// 		console.log("ERROR_的拉");
		// 	});
		let A = 0;
		let B = 0;
		if (msg.length == 2) {
			if (msg[0] == answer[0]) A++;
			if (msg[0] == answer[1]) B++;
			if (msg[1] == answer[0]) B++;
			if (msg[1] == answer[1]) A++;
			response += `${A}A, ${B}B`;
		}
		if (A == 2) {
			renewAnswer();
			response += "\nCONGRATULATIONS";
			response += "\nANSWER HAS BEEN RENEWED";
		}
		if(msg.length === 3){
			event.reply(MSGS.coffee);
			users.push(event.source.userId);
		}
	}
	if (event.message.type == 'image') {
		// event.reply("窩看不懂");
		event.reply([MSGS.coffee, MSGS.bubble])
			.then((data) => { console.log(data) })
			.catch((err) => { console.log(err) });
	}
	console.log(event.source.userId);//
	bot.push(event.source.userId)
}

function initBot() {
	//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
	app.listen(process.env.PORT || 8080);

	bot.on('message', replyMessage);
}

function _getJSON() {
	clearTimeout(timer);
	getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-41DC9AED-4979-4F29-8CB7-E6BF577E5036&limit=10&offset=0', function (error, response) {
		// response.forEach(function (e, i) {
		// 	pm[i] = [];
		// 	pm[i][0] = e.SiteName;
		// 	pm[i][1] = e['PM2.5'] * 1;
		// 	pm[i][2] = e.PM10 * 1;
		// });
		let records = response['records'];
		let result = records['weatherElement']['time']['dataTime']+"嘉義市	西區北新里海口寮路56號= "+records['weatherElement']['location'][0]['value']+", locationCode:"+records['weatherElement']['location'][0]['locationCode'];
		console.log(result);
		if(--sixtyMinCountDown === 0){
			sixtyMinCountDown = 60;
			users.forEach(e =>{
				bot.push(e, result);
			});
		}
	});
	timer = setInterval(_getJSON, 1 * 60 * 1000); //每半小時抓取一次新資料
}

function renewAnswer() {
	clearTimeout(timer);
	answer = Math.round(Math.random() * 10) * 10 + Math.round(Math.random() * 10);
	answer = answer + "";
	timer = setInterval(renewAnswer, 5 * 60 * 1000);
}



initBot();
app.post('/', linebotParser);
_getJSON();
// renewAnswer();


// 爬資料 remember to set time interval