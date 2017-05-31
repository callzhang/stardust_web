var index = require('../controllers/index');
var email = require('../controllers/email');
var uploads = require('../lib/multerUtil')
module.exports = function(app){
	/*首页*/
    app.get('/',index.index);
	app.get('/en',index.en);
	/*发送邮箱*/
	app.get('/email',email.email);
	app.post('/email',uploads.single('upload'),email.email_post);
}
