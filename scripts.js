/* Dark mode toggle */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️"; // Update button text
}

// Toggle dark mode on button click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");

  // Save the theme preference in localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Update button text
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
});

document.addEventListener("DOMContentLoaded", function () {
  /* Form submission */
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      var form = event.target;
      var formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset(); // Reset the form
            document.getElementById("contact-form").style.display = "none"; // Hide the form
            document.getElementById("thank-you-message").style.display =
              "block"; // Show the thank you message
          } else {
            response.json().then(function (data) {
              if (Object.hasOwn(data, "errors")) {
                alert(
                  data["errors"].map((error) => error["message"]).join(", ")
                );
              } else {
                alert("Oops! Det var ett problem att skicka formuläret");
              }
            });
          }
        })
        .catch(function (error) {
          alert("Oops! Det var ett problem att skicka formuläret");
        });
    });
});
