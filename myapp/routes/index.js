var express = require('express');
var router = express.Router();



const fs    = require('fs');
const vkapi = new (require('node-vkapi'))({ accessToken: 'vk1.a.0qrhJo_iYZx4O2Nul3A0I4xJxECvsN8aV_k9w4Y-mLVDtFjPVdfD7n3UoZEFMQ5gEHCPkU9oNWJnhDRf1YJr5tR5yZOLT3TXAiACd7BnBRLkCkQR486tfCQHrNsIfy9fyi_V0hesCwYQlf5xOGe9fy9DDGkeuU6xKKdZ93TsOwr4VtOz2bMGQ6wa3TPW6wec' });
	
	
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