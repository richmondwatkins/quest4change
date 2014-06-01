/* jshint unused:false */
/* global google:true */
'use strict';
var map;
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(36.1666670, -86.7833330),
        zoom: 11
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  doAjax();
  findMe();
}
google.maps.event.addDomListener(window, 'load', initialize);
var currentlyOpenWindow = null;
function addMarkerToMap(marker) {
     var infowindow = new google.maps.InfoWindow({
      content: marker.name
    });

    var gmapsmarker = new google.maps.Marker({
      position: new google.maps.LatLng(marker.gis[0],marker.gis[1]),
      map: map
    });

    google.maps.event.addListener(gmapsmarker, 'click', function() {
        if (currentlyOpenWindow) {
          currentlyOpenWindow.close();
        }
        infowindow.open(map,gmapsmarker);
        currentlyOpenWindow = infowindow;
    });
}
function addAllMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        addMarkerToMap(markers[i]);
    }
}

function doAjax() {
  $.ajax('http://localhost:3000/user/locations').done(function(data){
    addAllMarkers(data);
  });
}

function findMe(){
  var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, function(e) {
    console.log(e); }, options);
}

function success(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var latLng = new google.maps.LatLng(lat, lng);
  map.setCenter(latLng);
  map.setZoom(15);
  ///addMarker(lat,lng);
  console.log(position);
}
