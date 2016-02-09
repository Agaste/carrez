var express = require('express');
var bodyParser = require('body-parser');
var leboncoin = require('./lib/leboncoin.js');
var meilleursagents = require('./lib/meilleursagents.js');
var app = express();

var host = '127.0.0.1';
var port = '3030';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true })); // to support URL-encoded bodies


app.get('/', function(req,res) {
	res.render('index')
});

app.post('/url', function(req,res) {
	var url = req.body.url;

	leboncoin(url, function(err,data) {
			meilleursagents(data,function(err,data) {
					var resMA = {
						resMA: data
					}
					res.json(resMA);
				
			});
	});
}); 

/* var url = ;

 leboncoin(url,function(err,data)) {
 		meilleursagents(data,function(err,data)) {

 		}
 	}
*/
 /*}


}*/
app.listen(port, function() {
	console.log('Server listening on : '+host+':'+port);
});

