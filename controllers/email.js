/*首页*/
var nodemailer = require('nodemailer'); 
var fs = require('fs');
exports.email = function(req, res){
 	res.render('email',{
 		title:'email邮箱'
 	})
}
exports.email_post = function(req, res){
	var msg = req.body;
	var email = req.body.email;
	var file = fs.readFileSync('./public/js/20_freemail_domains.cf.txt', "utf8");
	var regExp =new RegExp(email.toLowerCase().split(/@/)[1]);
	var rest = regExp.exec(file);
	if (rest ==null) {
		var  file = req.file;
		var attachments;
		if (file) {
			 attachments=[  
			    {  
			        filename : file.filename,  
			        path: './public/upload/'+file.filename  
			    }
			]  
		}else{
			attachments=null
		}
		 
		res.json({code:1,msg:'成功'});
		var transporter = nodemailer.createTransport({  
		  host:'smtp.exmail.qq.com', 
		  secureConnection: true,
		  port:465,
		  auth: {  
		    user: 'contact@stardust.ai',  
		    pass: 'Passw0rd' 
		  
		  }  
	  	});  
		 var mailOptions = {  
		    from: 'contact@stardust.ai',   
		    to: 'contacts@stardust.ai', 
		    subject: '网站提交内容',  
		    //text: 'Hello world', // 文本  
		    html: '<h3 style="font-size:16px;font-weight: bold;">用户输入内容</h3><p style="margin-left: 20px;">用户姓名：'+msg.name+'</p><p style="margin-left: 20px;">邮箱：'+msg.email+'</p><p style="margin-left: 20px;">手机号：'+msg.phone+'</p><p style="margin-left: 20px;">留言板：'+msg.demand+'</p>',
		    attachments:attachments
		};  
	    transporter.sendMail(mailOptions, function (err, info) {  
	    	console.log(info);
		    if (err) {  
		      console.log(err);  
		      return;  
		    }  

	   });
    }else{
    	res.json({code:2,msg:'该邮箱无法使用'});
    }
	
}

