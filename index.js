var request = require('request');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.post{'/webhook',function(res,req) {
	if(!req.body) return res.sendStatus(400)
	res.setHeader('Content-Type','application/json');
    	var city = req.body.queryResult.parameters['geo-city'];
    	var w = getWeather(city);
    	let response = "";
    	let responseObj = {
    							"fulfillmentText" :response,
    							"fulfillmentMessages" : [{"text" : {"text" :[w]}}],
    							"source":""
    					  }
    	return res.json(responseObj);

    	}

}
var result;
function cb (err,response,body){
	if(err){
	}
		var weather = JSON.parse(body)
        if(weather.message === "city not found")
        {
        	result = "Unable to get weather" + weather.message;
        }
        else{
        	result="Right now it is " + weather.main.temp + " degrees with " +weather.weather[0].description;
        }

}
function getWeather(city){
	result = undefined;
	var url = 'api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=93aa738c3def4a59188a10de47cf0329'
	var req = request(url,cb);
	while (result===undefined){
		require('deasync').runLoopOnce();
	}
return result;
}