$(document).ready(function() {
// "https://spreadsheets.google.com/feeds/list/1U5vwX__V6z0jl2ngkeAgyBfW97vpWs9Oo6rrJ9tD3tY/od6/public/values?alt=json"

function bigList() {
	var piece1 = "V6z0jl2";
	$.getJSON("https://spreadsheets.google.com/feeds/list/1U5vwX__" + piece1 + "ngkeAgyBfW97vpWs9Oo6rrJ9tD3tY/od6/public/values?alt=json", function(data) {
  
	var entry = data.feed.entry;

	var htmlElements = "";
		for (var i = 0; i < entry.length; i++) {
				htmlElements += "<div class='section group'>"
				htmlElements += "<div class='col span_1_of_3'> <span class='title'>" + entry[i]['gsx$plantname']['$t'] + "</span>" + entry[i]['gsx$descrip']['$t'] +"</div>"
				htmlElements += "<figure class='col span_1_of_3'><img src=images/" + entry[i]['gsx$pic-1']['$t'] + "><figcaption>" + entry[i]['gsx$caption-1']['$t'] + "</figcaption></figure>"
				htmlElements += "<div class='col span_1_of_3'><img src=images/" + entry[i]['gsx$pic-2']['$t'] + "><figcaption>" + entry[i]['gsx$caption-2']['$t'] + "</figcaption></figure>"
				htmlElements += "</div>"
			}
		$('.container').html(htmlElements);
		});
	}

	$(".all").click(function() {
		bigList();
	});

function list() {
	$.getJSON("https://spreadsheets.google.com/feeds/list/1U5vwX__V6z0jl2ngkeAgyBfW97vpWs9Oo6rrJ9tD3tY/od6/public/values?alt=json", function(data) {

	var entry = data.feed.entry;

	$("button").click(function() {
		type_of_plant = $(this).attr("class");

	var htmlElements = "";
		for (var i = 0; i < entry.length; i++) {
			if (entry[i]['gsx$boolean']['$t'] == type_of_plant) {
				htmlElements += "<div class='section group'>"
				htmlElements += "<div class='col span_1_of_3'> <span class='title'>" + entry[i]['gsx$plantname']['$t'] + "</span>" + entry[i]['gsx$descrip']['$t'] +"</div>"
				htmlElements += "<figure class='col span_1_of_3'><img src=images/" + entry[i]['gsx$pic-1']['$t'] + "><figcaption>" + entry[i]['gsx$caption-1']['$t'] + "</figcaption></figure>"
				htmlElements += "<div class='col span_1_of_3'><img src=images/" + entry[i]['gsx$pic-2']['$t'] + "><figcaption>" + entry[i]['gsx$caption-2']['$t'] + "</figcaption></figure>"
				htmlElements += "</div>"
	  		} 
			}
		$('.container').html(htmlElements).fadeIn("250000");
		
			})
		});
	}
bigList();
list();

});

