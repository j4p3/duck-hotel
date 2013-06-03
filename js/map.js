function initialize() {
  var point = new google.maps.LatLng(22.300, 114.168);
  var mapOptions = {
    center: point,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var marker = new google.maps.Marker({
      position: point,
      map: map,
      title: 'Point'
  });
  }
google.maps.event.addDomListener(window, 'load', initialize);