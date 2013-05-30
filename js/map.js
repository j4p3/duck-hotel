function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map1 = new google.maps.Map(document.getElementById("map-canvas1"),
      mapOptions);
  var map2 = new google.maps.Map(document.getElementById("map-canvas2"),
      mapOptions);
  }
google.maps.event.addDomListener(window, 'load', initialize);