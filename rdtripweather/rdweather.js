// various variables...
var here = [];
var report = [];
var markers = [];
var directionsService = new google.maps.DirectionsService();

// When the window has finished loading create map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 5,
        streetViewControl: false,
        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(39.8106, -98.5561), // Lebanon, KS
        mapTypeControl: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        styles: [{
            stylers: [{
                saturation: -100
            }, {
                gamma: 1
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi.business",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi.business",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi.place_of_worship",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi.place_of_worship",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "water",
            stylers: [{
                visibility: "on"
            }, {
                saturation: 50
            }, {
                gamma: 0
            }, {
                hue: "#50a5d1"
            }]
        }, {
            featureType: "administrative.neighborhood",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#333333"
            }]
        }, {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [{
                weight: 0.5
            }, {
                color: "#333333"
            }]
        }, {
            featureType: "transit.station",
            elementType: "labels.icon",
            stylers: [{
                gamma: 1
            }, {
                saturation: 50
            }]
        }],
        mapTypeId: google.maps.MapTypeId.HYBRID
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // sets markers by clicking on the map (google code)
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
    });
}

function addMarker(location, icon) {
    if (markers.length < 4) {
        var pic;
        for (var i = 0; i <= markers.length; i++) {
            pic = ("images/" + i + ".png")
        };
        console.log(pic);
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: pic
        });

        marker.setMap(map);
        markers.push(marker);
        // add the lat/lng to variable collect, collect holds the waypoints needed for directions
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        var here = lat + "," + lng;
        console.log(here);
        weather(here);
    } else {
        alert("Four is the maximum number. Please clear all points and weather and begin again. You're the best.");
    }
};

function weather(here) {
    $.ajax({
        url: "https://api.wunderground.com/api/dc6c6c531a896ed3/geolookup/conditions/forecast/q/" + here + ".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            var numb = markers.length
            var locale = parsed_json['location'];
            var location = parsed_json['location']['city'];
            var state = parsed_json['location']['state'];
            var country = parsed_json['location']['country_name'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            var weather = parsed_json['current_observation']['weather'];
            var feels_like = parsed_json['current_observation']['feelslike_f'];
            var day = parsed_json['forecast']['txt_forecast']['forecastday'][0]['fcttext'];
            var night = parsed_json['forecast']['txt_forecast']['forecastday'][1]['fcttext'];
            // the weather report
            var report = ("<span class='numb'>" + numb + "</span>&nbsp;<span class='locale'>" + location + ", " + country + "</span><br><br> <span class='title'> Currently:</span> " + weather +
                " <span class='temp'> &nbsp;" + temp_f + "&deg;F&nbsp;&nbsp;</span><span class='feels_like'> Feels like: " + feels_like +
                "&deg;F &nbsp;</span><br><br> <span class='title'> Today: </span>" + day + "<br><br><span class='title'> Tonight: </span> " + night);

            $('#weather_here').append("<div>" + report + "</div>");
        }

    });
}

$(document).ready(function() {

    // Sets the map on all markers in the array.
    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Deletes all markers in the array by removing references to them.
    $("#redo").click(function() {
        $("#weather_here").empty();
        report = [];
        target = [];
        postIt = [];
        $("#submit").show();
        // clearMarkers();
        setAllMap(null);
        markers = [];
        $('#weather').hide();
        init();
    });

});
