document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear any existing error messages
    const errorMessages = document.querySelectorAll(".input-error");
    errorMessages.forEach((message) => (message.style.display = "none"));

    // Perform form validation
    let hasErrors = false;

    if (nameInput.value.trim() === "") {
      nameError.style.display = "block";
      hasErrors = true;
    }

    if (emailInput.value.trim() === "") {
      emailError.style.display = "block";
      hasErrors = true;
    }

    if (passwordInput.value.trim() === "") {
      passwordError.style.display = "block";
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Stop further execution
    }
  });

  // Add event listeners to input fields to hide error messages on input
  nameInput.addEventListener("input", function () {
    nameError.style.display = "none";
  });

  emailInput.addEventListener("input", function () {
    emailError.style.display = "none";
  });

  passwordInput.addEventListener("input", function () {
    passwordError.style.display = "none";
  });
});

// script.js (in your frontend)
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let hasErrors = false;

  if (name.trim() === "") {
    hasErrors = true;
  }

  if (email.trim() === "") {
    hasErrors = true;
  }

  if (password.trim() === "") {
    hasErrors = true;
  }

  if (hasErrors) {
    return; // Stop further execution
  }

  window.location.href = "login.html";

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  console.log(data.message); // Response message from the server
});
