var map1;
var infowindow1;
var place1;


function initialize1() {





if (document.getElementsByTagName('input')[0].value != "")
  {
    place1 = (document.getElementsByTagName('input'))[0].value;
  }
  else
   {
    place1 = new google.maps.LatLng(-33.8665433, 151.1956316);
  }




  var myOptions = {
    zoom: 2,
    center: new google.maps.LatLng(29.0,79.0),
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  };

  map1 = new google.maps.Map(document.getElementById('map-canvas'), myOptions);


  var request = {
    location: getLatLong(place1),
    radius: 500,
    types: ['store']
  };
  infowindow1 = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map1);
  service.nearbySearch(request, callback);
}

storeResult = [];
function getLatLong(address) {
var geocoder = new google.maps.Geocoder();
var result = "";
geocoder.geocode( { 'address': address }, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
         result[lat] = results[0].geometry.location.Pa;
         result[lng] = results[0].geometry.location.Qa;
     } else {
         result = "Unable to find address: " + status;
     }
     storeResult(result);
    });
}

function storeResult(term){
  var latlng = new Object();
  latlng[0] = result[lat];
  latlng[1] = result[lng];
  return latlng;
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map1,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow1.setContent(place.name);
    infowindow1.open(map1, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize1);