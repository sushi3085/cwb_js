var linebot = require('linebot')
var express = require('express')
var getJSON = require('get-json')

var bot = linebot({
	"channelId": "1656918423",
	"channelSecret": "bf5dd4e6a1bfe57aa6a8973ec0c72a56",
	"channelAccessToken": "XNUj1qPi/SwRUhXP0HqAlLcP1J3efxOF6SK5eTBhDwxP4oHWYAVSWKOfuE1KZUxO51bRlcy442SS+DwvF9wpA86ug+suW+MLCgeW/VWoKe7Ts9N3T4YjFUfvY+M2pliKPH5HYNhNq/N8yHBIJYYfZAdB04t89/1O/w1cDnyilFU="
});


const app = express();
const linebotParser = bot.parser();

function replyMessage(event) {
	// 將文字與影像訊息分開處理
	// console.log(event); //把收到訊息的 event 印出來看看
	if (event.message.type == 'text') {
		let msg = event.message.text;

		event.reply(msg+server.address().port).
			then(function (data) {
				console.log(msg);
			}).catch(function (err) {
				console.log("ERROR_的拉");
			});
	}
	if (event.message.type == 'image') {
		event.reply("窩看不懂");
	}
}

function initBot() {
	//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
	app.listen(process.env.PORT || 8080);

	bot.on('message', replyMessage);
}

initBot();
app.post('/', linebotParser);


// 爬資料 remember to set time interval