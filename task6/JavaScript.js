$(document).ready(function (){
    $('#button').click(function() {
            var toAdd = $('input[name=checkListItem]').val();
            console.log(toAdd);
            $('.list').append('<li id="item">' + toAdd + '</li>');
            $('#input-field').val('');
    });
});
