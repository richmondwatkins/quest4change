(function(){
/* jshint unused:false */
/* global google:true */
'use strict';
var map;
function initialize() {
//     var mapOptions = {
//         center: new google.maps.LatLng(36, -86),
//         zoom: 8
// };
// map = new google.maps.Map(document.getElementById('map-canvas'),
//     mapOptions);
initMap();
findMe();
}
google.maps.event.addDomListener(window, 'load', initialize);

function initMap(lat, lng, zoom){
  let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

  function findMe(){
  let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, e => console.log(e), options);
}

  function addMarkerToMap(marker) {
       var infowindow = new google.maps.InfoWindow({
        content: marker.name
      });

      var gmapsmarker = new google.maps.Marker({
        position: new google.maps.LatLng(marker.gis[0],marker.gis[1]),
        map: map,
        title: 'Hello World!'
      });

      google.maps.event.addListener(gmapsmarker, 'click', function() {
          infowindow.open(map,gmapsmarker);
      });
  }

  function success(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  let latLng = new google.maps.LatLng(lat, lng);
  map.setCenter(latLng);
  map.setZoom(15);
  addMarker(lat,lng);
  console.log(position);
  }

  function addMarker(lat, lng, name){
  let latLng = new google.maps.LatLng(lat, lng);
  new google.maps.Marker({map: map, position: latLng, title: name}); //icon: './media/icon.jpg'
}


function addAllMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        addMarkerToMap(markers[i]);
    }
}






})();
