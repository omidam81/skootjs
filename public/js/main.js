function scrollToContent($selector) {
    $("html, body").delay(300).animate({
        scrollTop: $($selector).offset().top
    }, 1500);
}


$("button.navbar-toggle").click(function(e) {
    $("#nav-icon").toggleClass("open"), $(".nav-primary").toggleClass("open").toggle( 200)
});


$(".bootstrap-select").each(function(index, el) {
    $(this).selectpicker("refresh");
});


$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    
    if( scroll > $("#header").height() ){
        $(".demo-sidebar").css("top",  15 + "px");
    }else{
        $(".demo-sidebar").css("top", $("#header").height() + 15 + "px");
    }
});
//$("#header").height() > 0 && $(".demo-sidebar").css("top", $("#header").height() + 15 + "px")


