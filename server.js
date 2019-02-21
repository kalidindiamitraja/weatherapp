const request = require('request');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
app.post('/webhook',function(req,res) {
	if(!req.body) return res.sendStatus(400);
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
)
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
    	return result;
}
function getWeather(city){
	result = undefined;
	var url = `api.openweathermap.org/data/2.5/weather?q${city}&units=imperial&APPID=93aa738c3def4a59188a10de47cf0329`;
	var result = request(url,cb);
	return result;
}
