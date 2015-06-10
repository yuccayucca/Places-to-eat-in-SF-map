//Yulia Ladutko
//yulialadutko@my.smccd.edu
//CIS 114 OL
//map.js
//Chapter 14
//Final
//05/25/2015

//references:
//https://developers.google.com/maps/documentation/javascript/examples/marker-animations-iteration
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
//http://googlemaps.googlermania.com/google_maps_api_v3/en/map_example_sidebar.html

var sf = new google.maps.LatLng(37.775, -122.434722);

var side_bar_html = "";
var markers = [];
var infowindows = [];
var map;

function initialize() {
  var mapOptions = {
    zoom: 13,
    center: sf
  };
	map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
}

var infowindow = new google.maps.InfoWindow({ 
	maxWidth: 120
  });
 
//initiates drop animation 
function drop() {
  clearMarkers();
  for (var i = 0; i < restaurants.length; i++) {
    addMarkerWithTimeout(restaurants[i], i * 150);
  }
}

function addMarkerWithTimeout(restaurants, timeout) {
	var pos = new google.maps.LatLng(restaurants [1], restaurants[2]);
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
		  position: pos,
		  map: map,
		  title: restaurants[0],
		  animation: google.maps.Animation.DROP
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent('<div><b>' + restaurants[0] + 
				'</b><br><br>' + restaurants[3] + '</div>'); 
			infowindow.open(map,this);
			});
		markers.push(marker);
		createMarkerButton(marker);
  }, timeout);
}

//removes markers and sidebar text
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = []; 
  
  var list = document.querySelectorAll('#marker-list li');
  for(var i=0; li=list[i]; i++) {
    li.parentNode.removeChild(li);
  }
}

function createMarkerButton(marker) {
  //Creates a sidebar button
  var ul = document.getElementById("marker-list");
  var li = document.createElement("li");
  var title = marker.getTitle();
  li.innerHTML = title;
  ul.appendChild(li);

  //Trigger a click event to marker when the button is clicked.
  google.maps.event.addDomListener(li, "click", function(){
    google.maps.event.trigger(marker, "click");
  });
}
google.maps.event.addDomListener(window, 'load', initialize);