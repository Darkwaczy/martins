/* ===================================================================
 * Transcend - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var cfg = {
            scrollDuration: 800, // smoothscroll duration
        },

        $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    /* Menu on Scrolldown
     * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {

        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }

        });
    };

    /* OffCanvas Menu
     * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger = $('.header-menu-toggle'),
            nav = $('.header-nav'),
            closeButton = nav.find('.header-nav__close'),
            siteBody = $('body'),
            mainContents = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e) {
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };

    /* photoswipe
     * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

        // get items
        $folioItems.each(function(i) {

            var $folio = $(this),
                $thumbLink = $folio.find('.thumb-link'),
                $title = $folio.find('.item-folio__title'),
                $caption = $folio.find('.item-folio__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width = $size[0],
                $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).on('click', function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };

    /* Stat Counter
     * ------------------------------------------------------ */
    var clStatCount = function() {

        var statSection = $(".s-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function() {
                        var $this = $(this);

                        $({
                            Counter: 0
                        }).animate({
                            Counter: $this.text()
                        }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function(curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                }

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };

    /* Masonry
     * ---------------------------------------------------- */
    var clMasonryFolio = function() {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function() {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });

        // layout Masonry after each image loads
        containerBricks.imagesLoaded().progress(function() {
            containerBricks.masonry('layout');
        });
    };

    /* slick slider
     * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [{
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    };

    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var clSmoothScroll = function() {

        $('.smoothscroll').on('click', function(e) {
            var target = this.hash,
                $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function() {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var clPlaceholder = function() {
        $('input, textarea, select').placeholder();
    };

    /* Alert Boxes
     * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        });

    };

    /* Animate On Scroll
     * ------------------------------------------------------ */
    var clAOS = function() {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    /* AjaxChimp
     * ------------------------------------------------------ */
    var clAjaxChimp = function() {

        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fas fa-exclamation-circle"></i> You must enter a valid e-mail address.',
            2: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
            3: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
            4: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.',
            5: '<i class="fas fa-exclamation-circle"></i> E-mail address is not valid.'
        }

    };

    /* Back to Top
     * ------------------------------------------------------ */
    var clBackToTop = function() {

        var pxShow = 500, // height on which the button will show
            fadeInTime = 400, // how slow/fast you want the button to show
            fadeOutTime = 400, // how slow/fast you want the button to hide
            scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
            goTopButton = $(".cl-go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

    /* Initialize
     * ------------------------------------------------------ */
    (function clInit() {

        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clAOS();
        clAjaxChimp();
        clBackToTop();

    })();

})(jQuery);