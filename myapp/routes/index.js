var express = require('express');
var router = express.Router();



const fs    = require('fs');
const vkapi = new (require('node-vkapi'))({ accessToken: 'apikey' });
	
	
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'vkbot' });
});

router.get('/bot/', function(req, res, next) {


	vkapi.call('messages.getDialogs', {
	unread: '1',
	count: 20
	
	
})
  .then(messages => answer(messages,res))
  .catch(error => res.send(error));
  
  

});

module.exports = router;
function answer(messages,res){
	console.log(messages.items[0].message);
	vkapi.call('messages.send',{
	user_id: messages.items[0].message.user_id,
	message: "Привет. Я - 8cher. Вы можете пообщаться со мной ."
	})
  .then(messages => res.send(messages.toString()))
  .catch(error => res.send(error));
	
	
}
