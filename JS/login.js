document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm")
    const identifierInput = document.getElementById("identifier")
    const passwordInput = document.getElementById("password")
    const identifierError = document.getElementById("identifierError")
    const passwordError = document.getElementById("passwordError")
  
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log("Form submitted:", { 
                identifier: identifierInput.value,
                password: passwordInput.value 
            })
            form.reset()
        }
    })
  
    identifierInput.addEventListener("input", validateIdentifier)
    passwordInput.addEventListener("input", validatePassword)
  
    function validateForm() {
        return validateIdentifier() && validatePassword()
    }
  
    function validateIdentifier() {
        const value = identifierInput.value.trim()
        // Check if input is either email or 8-digit ID
        const isValidId = /^\d{8}$/.test(value)
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  
        if (!isValidId && !isValidEmail) {
            showError(identifierError, "Please enter a valid email or 8-digit University ID")
            return false
        }
        hideError(identifierError)
        return true
    }

    function validatePassword() {
        const value = passwordInput.value
        if (value.length < 6) {
            showError(passwordError, "Password must be at least 6 characters")
            return false
        }
        hideError(passwordError)
        return true
    }
  
    function showError(element, message) {
        element.textContent = message
        element.style.display = "block"
    }
  
    function hideError(element) {
        element.textContent = ""
        element.style.display = "none"
    }
})