document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm")
  const universityIdInput = document.getElementById("universityId")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const universityIdError = document.getElementById("universityIdError")
  const emailError = document.getElementById("emailError")
  const passwordError = document.getElementById("passwordError")

  form.addEventListener("submit", (e) => {
      e.preventDefault()
      if (validateForm()) {
          console.log("Form submitted:", {
              universityId: universityIdInput.value,
              email: emailInput.value,
              password: passwordInput.value
          })
          form.reset()
      }
  })

  universityIdInput.addEventListener("input", validateUniversityId)
  emailInput.addEventListener("input", validateEmail)
  passwordInput.addEventListener("input", validatePassword)

  function validateForm() {
      return validateUniversityId() && 
             validateEmail() && 
             validatePassword()
  }

  function validateUniversityId() {
      const value = universityIdInput.value.trim()
      const isValid = /^\d{8}$/.test(value)

      if (!isValid) {
          showError(universityIdError, "Please enter a valid 8-digit University ID")
          return false
      }
      hideError(universityIdError)
      return true
  }

  function validateEmail() {
      const value = emailInput.value.trim()
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

      if (!isValid) {
          showError(emailError, "Please enter a valid email address")
          return false
      }
      hideError(emailError)
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