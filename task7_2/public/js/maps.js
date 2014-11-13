$(document).ready(function() {

  // Сделать так - По клику взять значения из инпутов
  // и на их основе отрисовать карту
  // jquery в помощь

  var map;
  function initialize() {
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng( latitude, longitude )
    };
    map = new google.maps.Map(document.getElementById('map_cont'),
      mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);

})
