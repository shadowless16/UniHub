document.addEventListener('DOMContentLoaded', function() {
    // Load header and sidebar
    Promise.all([
        fetch('/pages/components/header.html').then(response => response.text()),
        fetch('/pages/components/sidebar.html').then(response => response.text())
    ]).then(([headerHtml, sidebarHtml]) => {
        // Insert components
        document.getElementById('header-container').innerHTML = headerHtml;
        document.getElementById('sidebar-container').innerHTML = sidebarHtml;
        
        // Get current page
        const currentPage = document.body.getAttribute('data-page');
        
        // Set active states
        if (currentPage) {
            // For sidebar links
            const sidebarLinks = document.querySelectorAll('.nav-link[data-page]');
            sidebarLinks.forEach(link => {
                if (link.getAttribute('data-page') === currentPage) {
                    link.classList.add('active');
                }
            });

            // For mobile nav
            const mobileLinks = document.querySelectorAll('.fixed-bottom a');
            mobileLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (
                    (currentPage === 'profile' && href.includes('profile.html')) ||
                    (currentPage === 'home' && href === '/index.html') ||
                    (currentPage === 'clubs' && href.includes('joinclub.html'))
                ) {
                    link.classList.add('active');
                }
            });
        }
    });
});