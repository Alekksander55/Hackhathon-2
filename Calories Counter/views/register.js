
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!isValidEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault(); // Prevent form submission
    }

    if (passwordInput.value.length < 6) {
        alert('Password must be at least 6 characters long.');
        event.preventDefault(); // Prevent form submission
    }
});

function isValidEmail(email) {
    // Simple email validation regex (you might want to use a more robust solution)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}