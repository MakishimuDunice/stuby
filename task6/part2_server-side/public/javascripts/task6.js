$(document).ready(function (){
    $('#button').click(function() {
        var url = $('input[name=long-url-text-box]').val();
        var key = ('R_4694cb1c6d9b4d968154923eac579748');
        var username = ('makisimudunice');

        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var urltest=urlRegex.test(url);

        // validation is here

        if(!urltest) {
          alert('ERRROR. NO VALID URL!');
          return
        }
        $.ajax({

//          TODO Добавить error handler для ajax запроса к bitly

            url:"http://api.bit.ly/v3/shorten",
            data:{
                longUrl:url,
                apiKey:key,
                login:username
            },
            dataType:"jsonp",

            success: function (data){
                var short = data.data.url;
                save_url(url, short);
            },

            error: function (status, error){
              console.log(status,error);
            }

        });
    });
    $('.delete').click(function() {
      var elemId = this.id;

      console.log('del this  elem ' + elemId);

      $.ajax({
        type: "POST",
        url:"http://localhost:3000/del",
        data:{id:elemId},
        dataType:"json",

        // TODO Добавить error handler и success handler для обработки результатов удаления из БД

        error: function (jqXHR, textStatus, errorThrown){
            console.log(textStatus, errorThrown);
        },
        success: function(data, textStatus, jqXHR) {
          $("input#"+elemId).parent().remove();
        }

      });
    });
});


function save_url(long_url, short_url) {
  var template = "<li>" +
      "<span class='name'>Short url:" +
        "<a href='PUT_SHORT_URL_HERE'>PUT_SHORT_URL_HERE</a><br>" +
      "</span>" +
      "<span class='title'>Long url:" +
        "<a href='PUT_LONG_URL_HERE'>PUT_LONG_URL_HERE</a>" +
      "</span>" +
      "<input type='button' class='delete' value='X' id='entry._id'>" +
    "</li>";

  $.ajax({
    url: "/save",
    data: {
      long_url : long_url,
      short_url: short_url
    },
    type: "POST",
    dataType: "json",

    // TODO Добавить error handler и success handler для обработки результатов сохранения в БД

    error: function (jqXHR, textStatus, errorThrown){
      console.log(textStatus, errorThrown);
    },
    success: function(data, textStatus, jqXHR) {
      template = template.replace('entry._id', data._id);
      template = template.replace(/PUT_SHORT_URL_HERE/g, data.short_url);
      template = template.replace(/PUT_LONG_URL_HERE/g, data.long_url);
      $("ol").append(template);
    }

  });
}