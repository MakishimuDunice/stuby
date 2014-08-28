$(document).ready(function(){

    $('.on-off-inb').click(function() {
        $('.inbox-outbox-block').toggleClass('menu-action');
        $('.calendar-window').removeClass('menu-action');
        $('.menu-window-bm').removeClass('menu-action');

    });
    $('.on-off-calendar').click(function() {
        $('.calendar-window').toggleClass('menu-action');
        $('.inbox-outbox-block').removeClass('menu-action');
        $('.menu-window-bm').removeClass('menu-action');
    });
    $('.on-off-bm').click(function() {
        $('.menu-window-bm').toggleClass('menu-action');
        $('.inbox-outbox-block').removeClass('menu-action');
        $('.calendar-window').removeClass('menu-action');

    });
    $('.ts-src').click(function() {
        $('.on-off-tsk').toggleClass('menu-action');
    });

});