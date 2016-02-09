function get_reference (data, callback) { 
	var price_per_m2 = data.property.price / data.property.area,		
	location_str = data.property.location.city.toLowerCase()+'-'+data.property.location.postal_code,		
	url = "https://www.meilleursagents.com/prix-immobilier/"+location_str+"/#estimates";  

	var env = require('jsdom').env; 

	env(url, function (errors, window) { 
	var $ = require('jquery')(window);  
	var prices = $('.small-4.medium-2.columns').map(function () { 
		return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));		
		}).slice(3);  
	if (data.property.type == "Appartement") {			
		prices = prices.slice(0, 3);		
	} 
	else if (data.property.type == "Maison") {			
		prices = prices.slice(3, 6);		
	} 
	else {			
		prices = prices.slice(6);		
	}  
	var ret_data = {				
		type: data.property.type,				
		city: data.property.location.city,				
		postal_code: data.property.location.postal_code,				
		price_per_m2: price_per_m2,				
		good_deal: (price_per_m2 < prices[1]),				
		reference_price: {					
			lowest: prices[0],					
			average: prices[1],					
			highest: prices[2]				
		}			
	}; 
	callback(null, ret_data);	
});
} 
module.exports = get_reference;