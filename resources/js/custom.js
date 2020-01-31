'use strict';
$(document).on('ready', function () {
    $('body').waitForImages(function () {
        $("#preloader").delay(300).addClass('loaded');
    });

    /* ------------ HEADER ------------ */
    // Navbar Show When Scroll
    $(window).on('scroll',function () {
        var scroll = $(window).scrollTop();
        var homeheight = $(".hero").height() - 128;

        if (scroll > homeheight) {
            $("header.fixing").slideDown(100);
        } else {
            $("header.fixing").slideUp(100);
        }
    });

    /* ------------ HOME TYPED ------------ */
    if ($('.element').length) {
        $('.element').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2')],
                loop: $(this).data('loop') ? $(this).data('loop') : false,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000,
                typeSpeed: 10,
            });
        });
    }

    /* ------------ SLIDES ------------ */
    if ($('#slides').length) {
        //SUPER SLİDER
        $('#slides').superslides({
            animation: 'fade',
            play: 3000
        });
    }

    //SMOOTH SCROLL
    if ($('.hero').length) {
        $(document).on("scroll", onScroll);
        $('nav ul li a, .down-icon').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('a').each(function () {
                $(this).removeClass('active');
                if ($(window).width() < 768) {
                    $('nav').slideUp();
                    $('header').removeClass('open');
                }
            });

            $(this).addClass('active');

            var target = this.hash,
                menu = target;
            target = $(target);
            $('html, body').stop().animate({
                'scrollTop': target.offset().top

            }, 500, 'swing', function () {
                window.location.hash = target.selector;
                $(document).on("scroll", onScroll);
            });
        });
    }

    function onScroll(event) {
        if ($('#hero').length) {
            var scrollPos = $(document).scrollTop();
            $('nav ul li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('nav ul li a').removeClass("activelink");
                    currLink.addClass("activelink");
                }
            });
        }
    }

    // Menu animation
    $('.nav-icon').on("click", function () {
        $('header').toggleClass('open');
    });

    if ($(window).width() >= 769) {

        var box = $("nav ul>li");
        var tl = new TimelineMax({
            yoyo: false,
            reversed: true
        });

        tl.staggerFrom(box, .5, {
            x: "50",
            opacity: 0,
            ease: Back.easeOut
        }, 0.1);

        $(".nav-icon").on('click',function () {
            tl.reversed() ? tl.play() : tl.reverse();
        });
    }
    else {
        $('.nav-icon').on("click", function () {
            $('header nav').slideToggle();
        });
    }

    /* ------------ OWL CAROUSEL ------------ */
    var owlcar = $('.owl-carousel');
    if (owlcar.length) {
        owlcar.each(function () {
            var $owl = $(this);
            var itemsData = $owl.data('items');
            var autoplayData = $owl.data('autoplay');
            var autoPlayTimeoutData = $owl.data('autoplaytimeout');
            var dotsData = $owl.data('dots');
            var navData = $owl.data('nav');
            var marginData = $owl.data('margin');
            var stagePaddingData = $owl.data('stagepadding');
            var itemsDesktopData = $owl.data('items-desktop');
            var itemsTabletData = $owl.data('items-tablet');
            var itemsTabletSmallData = $owl.data('items-tablet-small');
            $owl.owlCarousel({
                items: itemsData
                , dots: dotsData
                , nav: navData
                , margin: marginData
                , loop: true
                , stagePadding: stagePaddingData
                , autoplay: autoplayData
                , autoplayTimeout: autoPlayTimeoutData
                , navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"]
                , responsive: {
                    0: {
                        items: itemsTabletSmallData,
                        stagePadding: 0
                    },
                    600: {
                        items: itemsTabletData,
                        stagePadding: 0
                    },
                    1000: {
                        items: itemsDesktopData
                    }
                }
                ,
            });
        });
    }

    /* ------------ MAGNIFIC & MASONRY ------------ */
    // MAGNIFIC POPUP FOR PORTFOLIO PAGE
    function magnific() {
        if ($('.lightbox-icon, .lightbox .image').length) {
            $('.lightbox-icon, .lightbox .image').magnificPopup({
                type: 'image',
                gallery: {enabled: true},
                zoom: {enabled: true, duration: 300}
            });
        }

        // LIGHTBOX VIDEO
        $('.video-icon').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    magnific();

    var $container = $('.masonry');
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.grid-item, .lightbox-gallery .msnry',
            gutter: 0,
            transitionDuration: "0.5s",
            columnWidth: '.grid-item'
        });
    })
    $('.portfolio_filter .filter span').on("click", function () {
        $(".portfolio_filter .filter span").removeClass("select-cat");
        $(this).addClass("select-cat");
        var selector = $(this).attr('data-filter');
        $(".masonry").isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });

    $(".filter-icon").on("click", function () {
        $('.portfolio_filter').addClass('show');
    });

    $(".portfolio_filter").on("click", function (event) {
        if (!$(event.target).is(".portfolio_filter ul li a")) {
            $('.portfolio_filter').removeClass('show');
            return false;
        }
    });

    // Infinite Scroll
    var curPage = 1;
    var pagesNum = $("#pagination-selector").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
            itemSelector: '.grid-item',
            nextSelector: '.portfolio-pagination li a',
            navSelector: '#pagination-selector',
            extraScrollPx: 0,
            bufferPx: 0,
            maxPage: 6,
            loading: {
                finishedMsg: "No more works",
                msgText: '<div class="loader"><span></span></div>',
                speed: 'slow',
                selector: '.load-more',
            },
        },
        // trigger Masonry as a callback
        function (newElements) {

            var $newElems = $(newElements);
            $newElems.imagesLoaded(function () {  // Append masonry
                $newElems.animate({opacity: 1});
                $container.isotope('appended', $newElems, true);
            });
            // Check last page
            curPage++;
            if (curPage == pagesNum) {
                $('.load-more button').remove();
            }
            $('.load-more').find('button').css('visibility', 'visible');
        });

    $container.infinitescroll('unbind');
    // jQuery
    $container.on('append.infinitescroll', function (event, response, path, items) {
        console.log('Loaded: ' + path);
    });

    $('.load-more button').on('click', function () {
        setTimeout(function () {
            magnific();
        }, 1000);
        $container.infinitescroll('retrieve');
        $('.load-more').find('button').css('visibility', 'hidden');
        return false;
    });

    $(window).on("pageshow", function (event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });

    // Contact form email send
    $( "#contact_form" ).on('submit',function( event ) {
        event.preventDefault();
        var form = $(this);

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: $(form).serialize()
        })
            .done(function (response) {
                $('.email-msg').html('Request sent successfully');
                $('#con_name, #con_email, #con_message').val('');
            })
            .fail(function (data) {
                $('.email-msg').html('Error when sending request.');

            });

    });
}); // document read end