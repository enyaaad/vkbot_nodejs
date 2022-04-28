var phrases = [];
var mongoClient = require("mongodb").MongoClient;
var request = require('sync-request');
var http = require('http');
var fs = require('fs');
const vkapi = new (require('node-vkapi'))({ accessToken: 'ACESS TOKEN' });
const cheerio = require('cheerio');

function random(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}
loop();
function loop(){
	vkapi.call('messages.getDialogs', {
	unread: '1',
	count: 20
	
	
})
  .then(messages => answer(messages))
  .catch(error => console.log(error));
setTimeout(loop,5000);
}
function sendms(message,user_id,attachment) 			{
if (attachment === undefined){
	attachment = "";
}
console.log(attachment);
			vkapi.call('messages.send',{
			user_id: user_id,
			/* message: brain(m.message.body) */
			message:message,
			attachment: attachment 
			})
  .then(messages => console.log(messages.toString()))
  .catch(error => console.log(error));	
	
	
}

function uploaddoc(user_id){
	vkapi.call('docs.getMessagesUploadServer',{
		type: "doc",
		peer_id: user_id,
		version: "5.75"
		
	})

.then(messages => console.log(messages.toString()))
.catch(error => console.log(error));
}

function uploadphoto(user_id){

	vkapi.call('docs.search',{
		q: "IMG*.jpg",
		count: 10,
		offset: random(1,999)
		
	})

.then(messages => {
var as = "";
for (var i = 0; i<10 ; i++){
		as+="doc";
		as+=messages.items[i].owner_id;
		as+="_";
		as+=messages.items[i].id;
		as+=",";
}
	as=as.substring(0,as.length - 1);
var ms = "";
for (var i = 0; i<10 ; i++){
		ms+="http://vk.com/id";
		ms+=messages.items[i].owner_id;
		ms+="\n";
}
	sendms("Смотри что нашел!",user_id,as);
	sendms("А вот кто прислал. \n"+ms,user_id);
})
.catch(error => console.log(error));
}

function answer(messages) { 
	if(messages.items[0]){
		messages.items.forEach(function(m){
			console.log(m.message);
			brain(m.message.body,m.message.user_id);
	
});
}
	else{
		console.log("Сообщений нет.");
	}
}

function getTime(){
var currentdate = new Date(); 
var datetime = "На данный момент : " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
return datetime;	
}


function getweather(){
var res = request('GET', 'ACCESS TOKEN');
var r = res.getBody().toString() ;
r = JSON.parse(r);
return r.main.temp;

}


function getnote(){
var res = request('GET', 'http://vpustotu.ru/random/');
var r = res.getBody().toString() ;
const $ = cheerio.load(r);
r = $('.fi_text').text();

return r;
}


function getnew(){

var res = request('GET', 'https://news.yandex.ru/');
var r = res.getBody().toString() ;
const $ = cheerio.load(r);
r = $('.story_view_main .story__aside .story__topic .story__title').text() +"\r\n" + $('.story_view_main .story__aside .story__topic .story__text').text();

return r;
}


function getprimer(){


}


function readfile(user){
  fs.readFile('file.txt', function(err, data) {
	  sendms(data.toString(),user)
  });
}

function brain(msg,user){
  switch (msg.toLowerCase()) {
  case "привет":
    sendms( 'Че как?',user );
    break;

  case "как дела?":
	sendms( 'Неплохо, ну если бы бот был бы готов, было бы лучше. А у тебя?',user );
    break;
	
  case "сколько времени?":
	sendms (getTime(),user);
    break;
	
  case "как погода?":
	sendms (getweather(),user);
    break
	
  case "рандомная записка":
	sendms (getnote(),user);
    break
	
   case "последняя новость":
	sendms (getnew(),user);
    break
	
   case "реши пример":
	sendms (getprimer(),user);
    break
	
   case "прочитай файл":
	readfile(user);
    break
	
   case "загрузи файл":
	uploaddoc(user);
    break
	
   case "загрузи фото":
	uploadphoto(user);
    break

	  default:
    sendms( 'КОМАНДЫ \r\n \r\n ! "Последняя новость" - Самая последняя новость. \r\n \r\n ',user );
}
}


