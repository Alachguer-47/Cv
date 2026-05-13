// script.js

$(document).ready(function () {
    
    // ----------------------------------------------------
    // 1. Smooth Scrolling for Navigation Links
    // ----------------------------------------------------
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Adjust for fixed header
            }, 800, 'swing');
        }
    });

    // ----------------------------------------------------
    // 2. Animate Skills Progress Bars on Scroll
    // ----------------------------------------------------
    var skillsAnimated = false;
    
    function animateSkills() {
        var skillsSection = $('#skills');
        if (skillsSection.length === 0) return;
        
        var sectionTop = skillsSection.offset().top;
        var windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > sectionTop + 100 && !skillsAnimated) {
            $('.progress').each(function () {
                var width = $(this).data('width');
                $(this).animate({ width: width }, 1500, 'swing');
            });
            skillsAnimated = true;
        }
    }

    // Trigger on scroll and on load in case it's already in view
    $(window).on('scroll', animateSkills);
    animateSkills();

    // ----------------------------------------------------
    // 3. Education Accordion
    // ----------------------------------------------------
    $('.accordion-header').on('click', function () {
        var item = $(this).parent();
        
        // Toggle the clicked item's content
        item.find('.accordion-content').slideToggle(300);
        
        // Toggle the active class for rotation
        item.toggleClass('active');
        
        // Optional: Close other accordions
        item.siblings().removeClass('active').find('.accordion-content').slideUp(300);
    });

    // ----------------------------------------------------
    // 4. Contact Form Validation (Event Delegation)
    // ----------------------------------------------------
    // We use event delegation here because the form is rendered by React
    // and might not exist in the DOM immediately when this script runs.
    
    $(document).on('submit', '#contactForm', function (event) {
        event.preventDefault(); // Prevent standard submission
        
        var isValid = true;
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        // Email Regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset errors
        $('.form-group').removeClass('has-error');
        $('#formSuccess').slideUp();

        // Validate Name
        if (name === '') {
            $('#group-name').addClass('has-error');
            isValid = false;
        }

        // Validate Email
        if (email === '' || !emailRegex.test(email)) {
            $('#group-email').addClass('has-error');
            isValid = false;
        }

        // Validate Message
        if (message === '') {
            $('#group-message').addClass('has-error');
            isValid = false;
        }

        // On Success
        if (isValid) {
            var btn = $('#submitBtn');
            var originalText = btn.html();
            
            // Loading state
            btn.html('<i class="fas fa-spinner fa-spin"></i> Envoi en cours...');
            btn.prop('disabled', true);
            
            // Simulate API Request via Timeout
            setTimeout(function() {
                btn.html(originalText);
                btn.prop('disabled', false);
                
                // Show success message
                $('#formSuccess').slideDown();
                
                // Reset form fields
                $('#contactForm')[0].reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    $('#formSuccess').slideUp();
                }, 5000);
            }, 1500);
        }
    });

});
