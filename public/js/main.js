function scrollToContent($selector) {
    $("html, body").delay(300).animate({
        scrollTop: $($selector).offset().top
    }, 1500);
}


$('.home-logo').owlCarousel({
    loop:true,
    nav:false,
    dots:true,
    margin:20,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:3,
        },
        1000:{
            items:6,
        }
    }
})
$('.home-logo2').owlCarousel({
    loop:true,
    nav:false,
    dots:true,
    margin:20,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:3,
        },
        1000:{
            items:6,
        }
    }
})