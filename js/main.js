/**
 * Main JavaScript file for Advisor website
 * Contains common functionality used across all pages
 */

// Check if the document is ready before initializing functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Advisor website initialized.');
    
    // Initialize any global elements or functionality
    initSmoothScrolling();
    initLogoAnimation();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    // Select all links with hashes
    document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Check if the hash is valid and exists on this page
            const targetId = this.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Smooth scroll to the element
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize subtle animation for the logo on hover
 */
function initLogoAnimation() {
    const logo = document.querySelector('header img');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

/**
 * Format date to Arabic format
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted date string in Arabic
 */
function formatArabicDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
}

/**
 * Function to show custom notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-full';
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    let bgColor = 'bg-blue-500';
    
    if (type === 'success') {
        bgColor = 'bg-green-500';
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
    }
    
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transform transition-transform duration-300 text-white ${bgColor}`;
    notification.innerHTML = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100%)';
    }, 3000);
}









