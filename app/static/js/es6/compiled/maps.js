(function() {
  'use strict';
  var map;
  function initialize() {
    initMap();
    findMe();
  }
  google.maps.event.addDomListener(window, 'load', initialize);
  function initMap(lat, lng, zoom) {
    var mapOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  function findMe() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(success, (function(e) {
      return console.log(e);
    }), options);
  }
  function addMarkerToMap(marker) {
    var infowindow = new google.maps.InfoWindow({content: marker.name});
    var gmapsmarker = new google.maps.Marker({
      position: new google.maps.LatLng(marker.gis[0], marker.gis[1]),
      map: map,
      title: 'Hello World!'
    });
    google.maps.event.addListener(gmapsmarker, 'click', function() {
      infowindow.open(map, gmapsmarker);
    });
  }
  function success(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latLng = new google.maps.LatLng(lat, lng);
    map.setCenter(latLng);
    map.setZoom(15);
    addMarker(lat, lng);
    console.log(position);
  }
  function addMarker(lat, lng, name) {
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({
      map: map,
      position: latLng,
      title: name
    });
  }
  function addAllMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      addMarkerToMap(markers[$traceurRuntime.toProperty(i)]);
    }
  }
})();

//# sourceMappingURL=maps.map
