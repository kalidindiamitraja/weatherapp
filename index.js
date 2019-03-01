var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io =require('socket.io')(server);
var w,city;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get('/webhook',function(req,res){
	res.setHeader('Content-Type','application/json');
  city = req.body.queryResult.parameters['geo-city'];
	var w = myfunc();
	console.log(w);
  var responseObj = {
    		"fulfillmentText" :" ",
    	  "fulfillmentMessages" : [{"text" : {"text" :[w]}}],
    		"source":""
    		}
  return res.json(responseObj);
  })
function weather (err , response , body )
{
var bod = JSON.parse(body);
w ='The temperature is '+ (bod.main.temp - 273) + ' in degree celsius' ;
return w;
}
function myfunc (){
w = undefined;
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=93aa738c3def4a59188a10de47cf0329`;
var k = request(url , weather);
    while(w===undefined){
        require('deasync').runLoopOnce();
}
return w;
}
app.get('/', function (req, res) {
	res.sendFile(path.join( __dirname + "/" + "public/index.html" ));
})
app.post('/', urlencodedParser, function (req, res) {
 city = req.body.geocity;
 var w = myfunc();
 res.end(w);
})
app.listen(process.env.PORT || 3000 , function(){
	console.log("port 3000 running");
});


