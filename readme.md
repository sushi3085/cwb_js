<!-- # 暫時把訊息打在這裡

# 畢竟，連假直接在群組@人不太人道。

---

首先是澄清一下...因為沒有糾正老師，當時想說也沒差，反正開發的人也只有我，會擔心的人也只有自己，所以就沒有跟老師說

- **其實我們用的是`JavaScript`不是`Java`**。

然後歡迎，超歡迎，十分歡迎 ~~(順序怪怪的？)~~ 您的加入。  
然後然後，容許我問幾個問題...畢竟都要一起開發了！

- 會用`Git`嗎？(基本push指令就可。
- 會想學`JS`嗎？(喔這題會了就跳過。
- 還有其他會用的語言嗎？

回答的話就用看是要用`commit`的還是其他方式直接回在這份檔案就好了。
感溫。

---

**學長你好!!很開心加入你們~**

雖然很不好意思，但我學得比較多的是java，其他都幾乎是新手而已
但我的學習力很快，有甚麼需要我幫忙的地方我會盡量去做的!!以下是回覆問題

- 會用`Git`嗎？(基本push指令就可。
不會QQ但目前在上網爬文看怎麼用了

- 會想學`JS`嗎？(喔這題會了就跳過。
會想學!但目前還沒有經驗

- 還有其他會用的語言嗎？
目前用過javascript 和一點點 python

在寫程式上還算是新手，所以很多方面還需要學習~如果可以，就請學長多多指教了，謝謝嗚嗚!!
-->

## 主要是看這個API怎麼用

- [Linebot_API(外部連結)](https://www.npmjs.com/package/linebot#api)

  >目前推估，裡面常用到的function有`event.***`跟`linebot.***`
  >舉例：`event.reply()`跟`linebot.push()`就有被應用在目前的App裡面。

可以對照下面code看，臨時寫的，怪怪的看不懂的地方就直接講，因為或許我是錯的。

```javascript
// 先把設定打包起來，之後產生一個linebot物件會需要用到
const configs = {
    "channelId": "1656918423",
	"channelSecret": "bf5dd4e6a1bfe57aa6a8973ec0c72a56",
	"channelAccessToken": "太長了，排版太醜",
}

var bot = linebot( config )

// 先提到一下先備知識：在 JS 中，函式是物件。
// 如果知道的話，Python裡面也是類似的情形，Python稱 function 為「一級物件」，可以被拿來放在參數、回傳值的位置，當作以上東東使用其功能。
// 而且其實JS也可以，舉個例好了。
/*

先做一個叫做smile的function，這是我們主要運行的function，只是我們不會直接call他

function smile(){
	console.log("I like smiling");
}

然後再這樣

var callMe = smile;

然後想想，如果要印出"I like smiling"可以這樣： smile();
也可以這樣： callMe();
也就是說，一般我們在用variable的時候，比如說 money = 10;    print(money); 等等...
我們打出 money 使用他的時候，電腦會回傳一個值，讓我們使用。只不過現在是從單純的值，變成一連串的作業程序，也就是function。
然後記得要call他，不然回傳的只會是記憶體位址。
就像這樣：

callMe();

所以傳入一個函數的意義可以是：在未來的某個 時間點 或是 事件發生時，call那個將要被執行的一連串指令。
ok 舉例說明結束。
這樣應該可以明白function作為參數傳入的合理性及意義。
*/

// bot.on( 參數1, 參數2 )這個function會依照第一個參數決定會在哪種情形運作。
// 假設是bot.on( 'message', 參數2 )，則是在「訊息(文字、圖片、連結、經緯訊息)傳輸事件發生時」，會執行參數2。
// 所以需要一個 "函式物件" 當作參數傳入。
// 所以在這裡先寫一個函式。

function dealwithMessage(event){
    switch(event.message.type){
        case 'message':
            // 處理接收到文字時的動作
            break;
        case 'image':
            // 處理接收到圖像時的動作
            break;
    }
}

// 然後再把專門處理訊息的function傳入，設定進去。
bot.on('message', dealwithMessage);

// 整個最重要的流程就這樣了
// 辛苦了 自學都很累
```

2022/02/28更
誒剛好看到一個，記一下
[Closure (computer programming) - Wikipedia](https://en.wikipedia.org/wiki/Closure_(computer_programming))
