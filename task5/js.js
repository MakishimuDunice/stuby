$(document).ready(function (){
    $('#button').click(function() {
        if ( 6 > $('#input-field').val().length < 8 &&  $('#input-field').val()[0] == '#'){
            var a = $('input[name=checkListItem]').val();
            $('body').css({ background: a});
            $('#input-field').val('');
        }

     });
 });
