$(document).ready(function() {
    $(".c-mainvisual__slider").slick({
        cssEase: "linear",
        respondTo: "slider",
        autoplay: true,
        infinite: true,
        dots: true,
        arrows: false,
        slidesToShow: 1
    });
    $(".c-newsletter__slider").slick({
        cssEase: "linear",
        speed: 2000,
        autoplay: true,
        infinite: true,
        dots: false,
        arrows: true,
        prevArrow: $(".c-mainvisual__bottomprevbtn"),
        nextArrow: $(".c-mainvisual__bottomnextbtn"),
        slidesToShow: 1
    });
});