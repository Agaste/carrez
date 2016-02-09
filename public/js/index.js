$("#result").hide();
$("#resetButton").hide();

$( ".input" ).focusin(function() {
	$( this ).find( "span" ).animate({"opacity":"0"}, 200);
});

$( ".input" ).focusout(function() {
  	$( this ).find( "span" ).animate({"opacity":"1"}, 300);
});

$("#refresh").click(function() {
	location.reload();
})

$("#compute").click(function() {

	
	var lbc_url = $("#url").val();
	$.post('./url', {
	url: lbc_url

	}, function(data,status) {
		if(data.status==null) {
			$("#compute").fadeOut();
			$("#starter").removeClass("login");
			$("#goodDeal").hide();
			$("#badDeal").hide();
			$("#resetButton").fadeIn();


				if(data.resMA.property_recup.good_deal) {
					$("#goodDeal").fadeIn();
				}
				else {
					$("#badDeal").fadeIn();
				}

				$("#price_leboncoin").text(Math.round(data.resMA.property_recup.price.square_meter_price));
				$("#price_meilleursagents").text(data.resMA.property_recup.price.average_price);
				$("#minMA").text(data.resMA.property_recup.price.min_price);
				$("#maxMA").text(data.resMA.property_recup.price.max_price);

			  	
			  	$("#result").fadeIn();
		}
		else {

		}
	});
});

/*
$(".login").submit(function(){
  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
  $("input").css({"border-color":"#2ecc71"});
  return false;
});
*/