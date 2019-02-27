var http = require('http');
var bodyparser = require('body-parser');
var express = require('express');
var request = require('request');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var w;
app.post('/webhook',function(req,res) {
	if(!req.body) return res.sendStatus(400);
	res.setHeader('Content-Type','application/json');
    	var city = req.body.queryResult.parameters['geo-city'];
    	var w = myfunc(city);
    	let response = "";
    	let responseObj = {
    				"fulfillmentText" :response,
    				"fulfillmentMessages" : [{"text" : {"text" :[w]}}],
    				"source":""
    			  }
    	return res.json(responseObj);
    }
)
function weather (err , response , body )
{
var bod = JSON.parse(body);
w = bod.main.temp ;
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
app.listen(process.env.PORT || 4000, function(){
	console.log('Your node js server is running');
});


