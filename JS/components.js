document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/pages/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // Initialize Bootstrap navbar toggler after loading
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler) {
                navbarToggler.addEventListener('click', function() {
                    const target = document.querySelector(this.getAttribute('data-bs-target'));
                    if (target) {
                        target.classList.toggle('show');
                    }
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load sidebar
    fetch('/pages/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar:', error));
});