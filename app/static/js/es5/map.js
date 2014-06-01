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
    var markerTitle = marker.name + ' (' + marker.class + ')';
    var popupContent = '<div class="popup"><div class="popupTitle">' + markerTitle + '</div><div class="popupLink"><a href=/location/checkin?locationid=' + marker._id + '>Check In</a></div></div>';
    var infowindow = new google.maps.InfoWindow({
      content: popupContent
    });
  var iconObj = {
    url: '/img/assets/pin-' + marker.iconType + '.svg',
    scaledSize: new google.maps.Size(25, 30)
  };

  var gmapsmarker = new google.maps.Marker({
    position: new google.maps.LatLng(marker.gis[0],marker.gis[1]),
    map: map,
    icon: iconObj});

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
var markers = []; // make markers global for debugging
function doAjax() {
  $.ajax('http://localhost:3000/user/locations').done(function(data){
    markers = data;
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
  console.log(position);
}
