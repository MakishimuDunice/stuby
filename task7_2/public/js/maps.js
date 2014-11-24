$(document).ready(function() {

  var latitude = $("#lat_inp").val();
  var longitude = $("#long_inp").val();
  var radius = $("#bot_inp").val();
  var key = ('AIzaSyBMmYj2dxWCUh7toNymZjjC9VwHo2CKSJo');
  var doctor = 'doctor';

  $('#go_button').click(function () {


    $.ajax({

      url: "https://maps.googleapis.com/maps/api/place/nearbysearch/",
      data: {
        key: key,
        location: latitude + ',' + longitude,
        radius: radius,
        sensor: false,
        types: doctor
      },
      dataType: "jsonp",

      success: function (data) {
        for (var a = 0; a < results.long + 1; a++) {
          var latitude_value = data.results[a].geometry.location.lat;
          var longitude_value = data.results[a].geometry.location.lng;
          var address = data.results[a].formatted_address;
          save_data(latitude_value, longitude_value, address);
        }
      },

      error: function (status, error) {
        console.log(status, error);
      }
    });



  });
  $('.delete').click(function() {
    var elemID = this.id;

    console.log('del this  elem ' + elemId);

    $.ajax({
      type: "POST",
      url:"http://localhost:3001/del",
      data:{id:elemId},
      dataType:"json",

      error: function (jqXHR, textStatus, errorThrown){
        console.log(textStatus, errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        $("input#"+elemId).parent().remove();
      }

    });
  })
});

function save_data(latitude_value, longitude_value, address) {
  var template = "<li>" +
    "<span class='name'>Широта:" +
      "<a href='latitude_value_here'>latitude_value_here</a><br>" +
    "</span>" +
    "<span class='title'>Долгота:" +
      "<a href='longitude_value_here'>longitude_value_here</a><br>" +
    "</span>" +
    "<span class='title'>Адрес:" +
      "<a href='address_here'>address_here</a>" +
    "</span>" +
    "<input type='button' class='delete' value='X' id='entry._id'>" +
    "</li>";

  $.ajax({
    url: "/save",
    data: {
      latitude_value: latitude_value,
      longitude_value: longitude_value,
      address: address
    },
    type: "POST",
    dataType: "json",


    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
    success: function (data, textStatus, jqXHR) {
      template = template.replace('entry._id', data._id);
      template = template.replace(/latitude_value_here/g, data.latitude_value);
      template = template.replace(/longitude_value_here/g, data.longitude_value);
      template = template.replace(/address_here/g, data.address);
      $("ol").append(template);
    }
  });
}
                    // !!!!!! Отрисовка карты - НЕ сделана !!!!!!


//function initialize() {
//  var mapOptions = {
//    zoom: 8,
//    center: new google.maps.LatLng(latitude, longitude),
//    radius: radius
//  };
//
//  var map = new google.maps.Map(document.getElementById('map_cont'),
//    mapOptions);
//}
//
//function loadScript() {
//  var script = document.createElement('script');
//  script.type = 'text/javascript';
//  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
//    'callback=initialize';
//  document.body.appendChild(script);
//}
//
//window.onload = loadScript;
