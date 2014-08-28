$(document).ready(function (){
    $('#input-field').keyup( function() {
        var $this = $(this);
        if($this.val().length > 50){
            $('#dick').removeClass("none");
        }
        else {
            $('#dick').addClass('none');
        }
    });

    $('#button').click(function() {
        if ($('#input-field').val().length > 50) {
            $('#dick').removeClass("none");
        }
        else if ($('#input-field').val().length) {
            var toAdd = $('input[name=checkListItem]').val();
            $('.list').append('<li id="item">' + toAdd + '</li>');
            $('#input-field').val('');
            $('#dick').addClass('none');

        }
    });
});