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

    $(document).ready(function () {

        // --- Dropdown hover ---
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

        // --- Blogs carousel ---
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

        // --- Isotope filters ---
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

        // --- Load testimonials dynamically ---
        const API_URL = "https://script.google.com/macros/s/AKfycbzBZualM5GhqWcKi-fTryI4FkYai4t0SnlTyBR4A-lzwTY03vfEN29-7c16yMBLI9nz7g/exec";
        const $carousel = $(".testimonials-carousel");

        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                console.log("Testimonials API data:", data);

                if (!data || !data.length) {
                    $carousel.html("<p>No testimonials yet.</p>");
                    return;
                }

                // Clear existing content
                $carousel.empty();

                // Append each testimonial
                data.forEach(r => {
                const stars = "⭐".repeat(r.rating || 0);

                // Convert Google Drive link to direct image link
                let photoUrl = "";
                if (r.photo) {
                    const match = r.photo.match(/(?:id=|file\/d\/)([-\w]+)(?:\/|$)/);
                    if (match && match[1]) {
                        photoUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
                    }
                }

                $carousel.append(`
                    <div class="testimonial-item wow fadeInUp" data-wow-delay="0.1s">
                        ${photoUrl ? `<div class="testimonial-img"><img src="${photoUrl}" alt="${r.name}"></div>` : ""}
                        <div class="testimonial-text">
                            <p>${r.review}</p>
                            <h3>${r.name}</h3>
                            <span>${stars}</span>
                        </div>
                    </div>
                `);
            });


                // Initialize Owl Carousel AFTER content is added
                $carousel.owlCarousel({
                    center: true,
                    autoplay: true,
                    dots: true,
                    loop: true,
                    margin: 20,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 1 },
                        768: { items: 2 },
                        992: { items: 3 }
                    }
                });

                // Refresh WOW.js for newly injected elements
                new WOW().sync();
            })
            .catch(err => {
                console.error("Testimonials error:", err);
                $carousel.html("<p>Failed to load testimonials.</p>");
            });
    });

})(jQuery);
