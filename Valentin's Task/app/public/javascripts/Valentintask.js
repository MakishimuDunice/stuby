$(document).ready(function (){
  $('#button').on("click", bitly_url);
  $('.show_long_url').on("click", show_boobs);
  $('#input-field').keyup(function(){
    if(event.keyCode==13)
    {
      bitly_url();
    }
  });
  $('.delete').click(deleteUrl);

// Счёт строк и реализация многостраничности будет тут !!!!!!!!!!!!!!!!!!!

  var line_nubber = function () {
    console.log($('#list').find("li").length);
  };
  line_nubber();

  if (line_nubber > 11){

  }


});

// Показывает скрытый элемент - длинный адрес

var show_boobs = function (e){
  var target = e.target;
  $(target).parent().find(".title").removeClass("title");
};

// Удалние записи

var deleteUrl = function() {
  var elemId = this.id;

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
};

// Получение короткого адреса

var bitly_url = function () {
  var url = $('input[name=long-url-text-box]').val();
  var key = ('R_4694cb1c6d9b4d968154923eac579748');
  var username = ('makisimudunice');

  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  var urltest=urlRegex.test(url);

  if(!urltest) {
    alert('ERRROR. NO VALID URL!');
    return
  }
  $.ajax({
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
};

// Сохранение в БД и вывод

function save_url(long_url, short_url) {
  var template = "<li>" +
      "<span class='name'>Short url:" +
        "<a href='PUT_SHORT_URL_HERE'>PUT_SHORT_URL_HERE</a>" +
        "<input type='checkbox' class='ch_b'></label>" +
        "<br>" +
      "</span>" +
      "<span class='title'>Long url:" +
        "<a href='PUT_LONG_URL_HERE'>PUT_LONG_URL_HERE</a>" +
      "</span>" +
      "<br>" +
      "<input type='button' class='show_long_url' value='Show long URL'>" +
      "<input type='button' class='delete' value='Delete record' id='entry._id'>" +
    "</li>";

  $.ajax({
    url: "/save",
    data: {
      long_url : long_url,
      short_url: short_url
    },
    type: "POST",
    dataType: "json",

    error: function (jqXHR, textStatus, errorThrown){
      console.log(textStatus, errorThrown);
    },
    success: function(data, textStatus, jqXHR) {
      template = template.replace('entry._id', data._id);
      template = template.replace(/PUT_SHORT_URL_HERE/g, data.short_url);
      template = template.replace(/PUT_LONG_URL_HERE/g, data.long_url);
      $("ul").append(template);
      $("#list").find("ul").find("li").last().find(".delete").click(deleteUrl);
    }

  });
}



