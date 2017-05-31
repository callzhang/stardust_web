var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/route.js');
app.set('views','./views');
app.set("view engine","ejs");
app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser());
var server = app.listen(port, function () {
    var port = server.address().port
     console.log('端口号:', port)
})
/*路由*/
routes(app);

