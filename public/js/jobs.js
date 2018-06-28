$(document).ready(function(){
$('.btn-view-job').click(function(){
    event.stopPropagation();

    $('iframe').show(100);
})
$('body').click(function(){
    $('iframe').hide(100);
});
$('iframe').click(function(event ){
    event.stopPropagation();
})
});
