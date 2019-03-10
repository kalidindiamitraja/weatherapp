var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var app = express();
var server = require('http').createServer(app);
var w,city;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
server.post('/webhook',function(request,response){
	if(err) throw err;
	console.log("into the post");
	response.setHeader('Content-Type','application/json');
	city = request.body.queryResult.parameters['geo-city'];
	console.log("found city");
	w = myfunc();
  	let responseObj = {
    		"fulfillmentText" :" ",
    	  	"fulfillmentMessages" : [{"text" : {"text" :[w]}}],
    		"source":""
	}
	response.send(responseObj);
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
	res.sendFile( __dirname + "/" + "public/index.html" );
})
app.post('/', urlencodedParser, function (req, res) {
 city = req.body.geocity;
 var w = myfunc();
 res.end(w);
})
server.listen(process.env.PORT || 3000 , function(){
	console.log("port 3000 running");
});


