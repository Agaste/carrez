

	var request = require('request');
	var cheerio = require('cheerio');
	var fs = require('fs');
	var leboncoinJSON = require('../schema/leboncoin'); //load the schema

	function parseLBC (LBCurl, callback) {
	//var LBCurl = 'http://www.leboncoin.fr/ventes_immobilieres/918673134.htm?ca=12_s';

	request(LBCurl, function (error, response, body) {
	  if (!error) {
	    var $ = cheerio.load(body); //load the body of the html code

	    var table_infos = $("[class='lbcParams criterias']>table >tr >td");

	    if(table_infos[0].children[0].data == 'Oui')
	    	table_infos=table_infos.slice(1);


	    var dataLBC = {
	    	price: $("[itemprop='price']").text().match(/[0-9,]/g).join("").replace(",", "."),
	    	cityName: $("[itemprop='addressLocality']").text(),
	    	zip_code: $("[itemprop='postalCode']").text(),
	    	property_type: table_infos[0].children[0].data,
	    	rooms: table_infos[1].children[0].data,
	    	surface: table_infos[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".")
	    };

			callback(null, dataLBC);
	    }

	  else {
	    console.log("We’ve encountered an error: " + error);
	}

	});
}
module.exports = parseLBC;





/*
	      leboncoinJSON.property.price = $("[itemprop='price']").text().match(/[0-9,]/g).join("").replace(",", ".");
		  leboncoinJSON.property.cityName = $("[itemprop='addressLocality']").text();
		  leboncoinJSON.property.zip_code = $("[itemprop='postalCode']").text();
		  var table_infos = $("[class='lbcParams criterias']>table >tr >td");
		  leboncoinJSON.property.property_type = table_infos[0].children[0].data;
		  leboncoinJSON.property.rooms = table_infos[1].children[0].data;
		  leboncoinJSON.property.surface = table_infos[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
*/
		
		  
		  //console.log(table_infos);
/*
		  fs.writeFile('outputLBC.json', JSON.stringify(leboncoinJSON,null,4),function(err) {
		});
*/		  