/* jshint unused:false */
/* global google:true */
'use strict';
var map;
function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(36, -86),
        zoom: 8
};
map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

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
function addAllMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        addMarkerToMap(markers[i]);
    }
}
