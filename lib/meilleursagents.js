
	var request = require('request');
	var cheerio = require('cheerio');
	var fs = require('fs');
	var meilleursagentsJSON = require('../schema/meilleursagents'); //load the schema
	var leboncoin_results = require('./outputLBC.json');
	//	var url = 'https://www.meilleursagents.com/prix-immobilier/'+leboncoin_results.property.cityName.toLowerCase()+'-'+leboncoin_results.property.zip_code+'/#estimates';
	
function parseMA(dataLBC,callback) {

	var url = './schema/test_output_arcueil.html';
	var square_meter = dataLBC.price / dataLBC.surface;

//	request(url, function (error, response, body) {
	//if (!error) {
//	  	console.log(url);
	
	    var $ = cheerio.load(fs.readFileSync(url,'utf8')); //load the body of the html code
	    var gooddeal = false;

	    	var temp = $('.small-4.medium-2.columns');
	    	temp = temp.slice(3);

/*
	    	meilleursagentsJSON.property_recup.average_price_flat = temp[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
			meilleursagentsJSON.property_recup.average_price_house = temp[4].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
			meilleursagentsJSON.property_recup.average_price_rental = temp[7].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
*/

	    	if(dataLBC.property_type=="Appartement") {
				temp = temp.slice(0,3);
	    	}

	    	else if(dataLBC.property_type=="Maison") {
	    		temp = temp.slice(3,6);
	    	}

	    	else {
	    		temp = temp.slice(6);
	    	}

/*			
	    	meilleursagentsJSON.property_recup.price.min_price = temp[0].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	    	meilleursagentsJSON.property_recup.price.average_price = temp[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	    	meilleursagentsJSON.property_recup.price.max_price = temp[2].children[0].data.match(/[0-9,]/g).join("").replace(",", ".");
	    	meilleursagentsJSON.property_used.zip_code = leboncoin_results.property.zip_code;
	    	meilleursagentsJSON.property_used.cityName = leboncoin_results.property.cityName;
	    	meilleursagentsJSON.property_recup.price.square_meter_price = leboncoin_results.property.price/leboncoin_results.property.surface;
*/
			if(Math.round(square_meter) > temp[1].children[0].data.match(/[0-9,]/g).join("").replace(",", ".")) {
				gooddeal = false;
			}

			else {
				gooddeal = true;
			}	

		var MAdata = {
			property_used: {
				zip_code: dataLBC.zip_code,
				cityName: dataLBC.cityName
			},
			property_recup: {
				/*average_price_flat: temp[1].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),
				average_price_house: temp[4].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),
				average_price_rental: temp[7].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),*/
				price: {
					min_price: temp[0].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),
					average_price: temp[1].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),
					max_price: temp[2].children[0].data.match(/[0-9,]/g).join("").replace(",", "."),
					square_meter_price: square_meter
				},
				good_deal: gooddeal
			}
		}

		callback(null,MAdata);
	//}

	/*else {
	    console.log("We’ve encountered an error: " + error);
	}*/
}

			//console.log(meilleursagentsJSON.property_recup.price.min_price.match(/[0-9,]/g).join(""));

/*			
			fs.writeFile('outputMA.json',JSON.stringify(meilleursagentsJSON,null,4), function(err) {
			})
*/			
			//return MA;
	  //}
	  /* 
		else {
	    	console.log("We’ve encountered an error: " + error);
	    	*/
//	    	callback(null,result);

//}
module.exports = parseMA;