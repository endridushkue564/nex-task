/*
   File Name: AdvancedWebFormValidation.js
   Content: A sophisticated and elaborate web form validation with various checks and custom error messages.
*/

// Global variables
var form = document.getElementById("myForm");
var inputs = form.querySelectorAll(".form-input");

// Event listener to validate form on submit
form.addEventListener("submit", function(event) {
   event.preventDefault();
   validateForm();
});

// Function to validate form
function validateForm() {
   var valid = true;

   for(var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var value = input.value.trim();
      
      // Check required fields
      if(input.hasAttribute("required")) {
         if(value === "") {
            showError(input, "This field is required.");
            valid = false;
            continue;
         }
      }
      
      // Check email input
      if(input.getAttribute("type") === "email") {
         if(!validateEmail(value)) {
            showError(input, "Please enter a valid email address.");
            valid = false;
            continue;
         }
      }
      
      // Check password complexity
      if(input.getAttribute("type") === "password") {
         if(!validatePassword(value)) {
            showError(input, "Please enter a password with at least 8 characters, containing a digit, an uppercase and a lowercase letter.");
            valid = false;
            continue;
         }
      }
      
      // Add validation for custom fields...
   }

   if(valid) {
      form.submit();
   }
}

// Function to validate email
function validateEmail(value) {
   var regex = /\S+@\S+\.\S+/;
   return regex.test(value);
}

// Function to validate password complexity
function validatePassword(value) {
   var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
   return passwordRegex.test(value);
}

// Function to show error message
function showError(input, message) {
   // Remove any existing error message
   var error = input.parentElement.querySelector(".error-message");
   if(error) {
      input.parentElement.removeChild(error);
   }
   
   // Create error message element
   error = document.createElement("p");
   error.textContent = message;
   error.classList.add("error-message");
   
   // Insert error message after input
   input.parentElement.insertBefore(error, input.nextSibling);
}