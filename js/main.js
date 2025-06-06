$(document).ready(function() {
    // Mobile navigation toggle
    $('.mobile-nav-toggle').click(function() {
        $(this).toggleClass('open');
        $('.main-nav').toggleClass('open');
    });

    // Close mobile menu when clicking on a nav link
    $('.main-nav a').click(function() {
        $('.mobile-nav-toggle').removeClass('open');
        $('.main-nav').removeClass('open');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('header').length) {
            $('.mobile-nav-toggle').removeClass('open');
            $('.main-nav').removeClass('open');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        }
    });

    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').css('background-color', 'rgba(255, 255, 255, 0.95)');
            $('#header').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)');
        } else {
            $('#header').css('background-color', 'rgba(255, 255, 255, 0.95)');
            $('#header').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.1)');
        }
        
        // Show/hide back to top button
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
    });

    // Back to top button click event
    $('#back-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Services tabs functionality
    $('.tab-btn').click(function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all tabs and panels
        $('.tab-btn').removeClass('active');
        $('.tab-panel').removeClass('active');
        
        // Add active class to current tab and panel
        $(this).addClass('active');
        $('#' + tabId + '-panel').addClass('active');
    });

    // Success stories slider
    const stories = $('.story-slide');
    const totalStories = stories.length;
    let currentStory = 0;
    
    // Create dots for slider navigation
    for (let i = 0; i < totalStories; i++) {
        $('.slider-dots').append('<div class="dot" data-index="' + i + '"></div>');
    }
    
    // Set first dot as active
    $('.dot:first-child').addClass('active');
    
    // Function to show a specific story
    function showStory(index) {
        stories.hide();
        $(stories[index]).css('display', 'grid');
        
        // Update dots
        $('.dot').removeClass('active');
        $('.dot[data-index="' + index + '"]').addClass('active');
        
        currentStory = index;
    }
    
    // Next button click event
    $('.next-btn').click(function() {
        currentStory = (currentStory + 1) % totalStories;
        showStory(currentStory);
    });
    
    // Previous button click event
    $('.prev-btn').click(function() {
        currentStory = (currentStory - 1 + totalStories) % totalStories;
        showStory(currentStory);
    });
    
    // Dot click event
    $('.dot').click(function() {
        const index = $(this).data('index');
        showStory(index);
    });
    
    // Auto rotate stories every 5 seconds
    setInterval(function() {
        currentStory = (currentStory + 1) % totalStories;
        showStory(currentStory);
    }, 15000);
    
    // Contact form submission (for demonstration)
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#message').val();
        
        // Validate form (simple validation)
        if (name && email && message) {
            // In a real implementation, you would send this data to a server
            
            // Show success message (for demonstration)
            $(this).html('<div class="success-message"><i class="fa-solid fa-check-circle"></i><h3>Thank you for your message!</h3><p>We\'ll get back to you as soon as possible.</p></div>');
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // Add animation to elements when they come into view
    function animateOnScroll() {
        $('.service-item, .step, .story-slide, .about-image').each(function() {
            const elementPosition = $(this).offset().top;
            const viewportHeight = $(window).height();
            const scrollY = $(window).scrollTop();
            
            if (elementPosition < scrollY + viewportHeight - 100) {
                $(this).css('opacity', '1');
                //$(this).css('transform', 'translateY(0)');
            }
        });
    }
    
    // Set initial state for animated elements
    $('.service-item, .step, .story-slide, .about-image').css({
        'opacity': '0',
        //'transform': 'translateY(20px)',
        'transition': 'opacity 0.5s ease, transform 0.5s ease'
    });
    
    // Call animation function on scroll
    $(window).scroll(function() {
        animateOnScroll();
    });
    
    // Call animation function on page load
    animateOnScroll();
});
