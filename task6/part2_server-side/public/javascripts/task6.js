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
            }
        });

        function get_url(a){
            $('#list').append('<li id="item">' + a + '</li>');
            $('#input-field').val('');
        }
    });
});
