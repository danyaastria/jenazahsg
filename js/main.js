(function ($) {
    "use strict";

    // Initiate WOW
    new WOW().init();

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });

    // Dropdown hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    // Blogs carousel (unchanged)
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });

    // Isotope filters (unchanged)
    var classIsotope = $('.class-container').isotope({
        itemSelector: '.class-item',
        layoutMode: 'fitRows'
    });

    $('#class-filter li').on('click', function () {
        $("#class-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        classIsotope.isotope({ filter: $(this).data('filter') });
    });

    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // ✅ LOAD TESTIMONIALS (FIXED)
    $(document).ready(function () {

        const API_URL = "https://script.google.com/macros/s/AKfycbziSzKTAdikNYDKZOMhaSZ1dl_vb1T61MIv9n8gOwnxMd7f5FqpOuR5p1IWdFOmUDFUQQ/exec";
        const $carousel = $(".testimonials-carousel");

        fetch(API_URL)
            .then(res => res.json())
            .then(data => {

                if (!data || !data.length) return;

                $carousel.empty();

                data.forEach(r => {
                    const stars = "⭐".repeat(r.rating || 0);

                    $carousel.append(`
                        <div class="testimonial-item">
                            <div class="testimonial-img">
                                ${r.photo ? `<img src="${r.photo}" alt="${r.name}">` : ""}
                            </div>
                            <div class="testimonial-text">
                                <p>${r.review}</p>
                                <h3>${r.name}</h3>
                                <span>${stars}</span>
                            </div>
                        </div>
                    `);
                });

                // 🔥 INIT OWL ONLY AFTER CONTENT EXISTS
                $carousel.owlCarousel({
                    center: true,
                    autoplay: true,
                    dots: true,
                    loop: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 1 },
                        768: { items: 2 },
                        992: { items: 3 }
                    }
                });
            })
            .catch(err => console.error("Testimonials error:", err));
    });

})(jQuery);