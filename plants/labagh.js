// sets up the map on the page, where the focus is
function initMap() {
  var labagh = {
    lat: 41.979632,
    lng: -87.743764
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: labagh,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });
  setMarkers(map);
  }
 var infoWindow = new google.maps.InfoWindow({map: map});


function setMarkers(map) {
  // pull from google sheet
  $.getJSON(
    "https://spreadsheets.google.com/feeds/list/1WflcyuHrfXxobvoSzyYApTr_tOdWKz4kwgiYj1oypM0/od6/public/values?alt=json",
    function(data) {
      var entry = data.feed.entry;
      for (var i = 0; i < entry.length; i++) {
        // console.log(entry[i]['gsx$species']['$t']);
        lat = parseFloat(entry[i]['gsx$lat']['$t']);
        lng = parseFloat(entry[i]['gsx$long']['$t']);
        species = entry[i]['gsx$species']['$t'];
        contentString = ("<div class='info-box'>  <h3> species: " + entry[i]['gsx$species']['$t'] +
          "</h3><p>Lat: " + entry[i]['gsx$lat']['$t'] + "</p><p>Long: " + entry[i]['gsx$long']['$t'] + "</p></div>")
        console.log(contentString);
        console.log(lat);

        // if (species == "d-red oak") {
        var marker = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          }, 
          icon: {
          	path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
          	scale: 2,
          	strokeColor: 'yellow'
          },
          map: map,
        });
        google.maps.event.addListener(marker, 'click', getInfoCallback(map,
          contentString));
      } 


      function getInfoCallback(map, content) {
        var infowindow = new google.maps.InfoWindow({
          content: content,
           maxWidth: 120
        });
        return function() {
          infowindow.setContent(content);
          infowindow.open(map, this);
        };
      }
    });
};



