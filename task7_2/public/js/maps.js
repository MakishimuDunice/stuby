$(document).ready(function() {

  // Сделать так - По клику взять значения из инпутов
  // и на их основе отрисовать карту
  // jquery в помощь

  $('#go_button').click(function() {
    var latitude = $('lat_inp').val();
    var longitude = $('long_inp').val();
    var coordinat = /-?\d{1,3}\.\d+/ig;
    var coord_test_one = coordinat.test(latitude);
    var coord_test_two = coordinat.test(longitude);

    if (!coord_test_one || !coord_test_two ) {
      alert('ERRROR. NO VALID URL!');
      return
    }

  })

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
