/**
 * Navigation JavaScript for Advisor website
 * Handles mobile menu functionality and active menu items
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Set active menu item based on current page
    highlightActiveMenuItem();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('block');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
            }
        });
    }
}

/**
 * Highlight the active menu item based on current page URL
 */
function highlightActiveMenuItem() {
    // Get the current page path
    const currentPath = window.location.pathname;
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the link path matches the current page path
        if (currentPath.endsWith(linkPath)) {
            // Add active class (although this might be redundant due to existing styling)
            link.classList.add('active');
        }
    });
}

/**
 * Handle scroll events to change header appearance
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (header) {
        if (window.scrollY > 50) {
            // Add shadow and reduce padding when scrolling down
            header.classList.add('shadow-md');
            header.classList.remove('shadow-sm');
            
            // Optionally reduce logo size and header padding on scroll
            const logo = header.querySelector('img');
            if (logo) {
                logo.style.height = '2.5rem'; // 40px
                logo.style.transition = 'height 0.3s ease';
            }
        } else {
            // Restore original appearance when at the top
            header.classList.remove('shadow-md');
            header.classList.add('shadow-sm');
            
            // Restore original logo size
            const logo = header.querySelector('img');
            if (logo) {
                logo.style.height = '3rem'; // 48px
            }
        }
    }
});









