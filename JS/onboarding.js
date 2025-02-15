document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('onboardingForm');
    const userTypeSelect = document.getElementById('userType');
    const levelGroup = document.getElementById('levelGroup');

    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'student') {
            levelGroup.style.display = 'block';
        } else {
            levelGroup.style.display = 'none';
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically send the data to your server
            console.log('Form submitted successfully');
            alert('Profile created successfully!');
            // Redirect to the main page or dashboard
            // window.location.href = 'index.html';
        }
    });

    function validateForm() {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const username = document.getElementById('username');
        const level = document.getElementById('level');

        // Reset previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        if (firstName.value.trim() === '') {
            showError(firstName, 'First name is required');
            isValid = false;
        }

        if (lastName.value.trim() === '') {
            showError(lastName, 'Last name is required');
            isValid = false;
        }

        if (username.value.trim() === '') {
            showError(username, 'Username is required');
            isValid = false;
        } else if (username.value.length < 3) {
            showError(username, 'Username must be at least 3 characters long');
            isValid = false;
        }

        if (userTypeSelect.value === '') {
            showError(userTypeSelect, 'Please select your role');
            isValid = false;
        }

        if (userTypeSelect.value === 'student' && level.value === '') {
            showError(level, 'Please select your level');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
});