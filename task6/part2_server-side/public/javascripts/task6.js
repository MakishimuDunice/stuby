$(document).ready(function (){
    $('#button').click(function() {
        var url = $('input[name=long-url-text-box]').val();
        var key = ('R_4694cb1c6d9b4d968154923eac579748');
        var username = ('makisimudunice');
        $.ajax({
            url:"http://api.bit.ly/v3/shorten",
            data:{
                longUrl:url,
                apiKey:key,
                login:username
            },
            dataType:"jsonp",
            success: function beatly(data){
                var short = data.data.url;
                get_url(short);
                save_url(url, short);
            }
        });
    });
});

function get_url(a){
  $('#list').append('<li id="item">' + a + '</li>');
  $('#input-field').val('');
}

function save_url(long_url, short_url) {
  $.ajax({
    url: "/save",
    data: {
      long_url : long_url,
      short_url: short_url
    },
    type: "POST",
    dataType: "json",
    success: function(data, textStatus, jqXHR ) {
      alert(data.status + "\n" + data.modelId);
    },
    error: function(jqXHR, textStatus, errorThrown ) {
      console.log("error", jqXHR);
    }
  });
}
