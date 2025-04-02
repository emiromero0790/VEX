document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById("toggle_password");


    toggleButton.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleButton.textContent = "🙈"; 
        } else {
            passwordInput.type = "password";
            toggleButton.textContent = "👁️"; 
        }
    });
});
