/* global google */
/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  var map;

  function init(){
    initMap();
    findMe();
  }

  function addMarker(lat, lng, name){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name});
  }

  function findMe(){
  let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, e => console.log(e), options);

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


  function initMap(lat, lng, zoom){
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();
