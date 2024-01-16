// document.getElementById('loginForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const token = localStorage.getItem('token');

//     if(token)
//     fetch('/login', {
//         method: 'POST',
//         headers: {
            
//             'Content-Type': 'application/json',
//             'Authorization': token
//         },
//         body: JSON.stringify({ email, password }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.token) {
//             // Save the token in localStorage
//             console.log(data.token)
//             localStorage.setItem('token', data.token);

//             // Redirect to the dashboard
//             window.location.href = '/dashboard';
//         } else {
//             console.error('Login failed:', response.statusText);
//             // Handle login failure
//         }
//     })
//     .catch(error => console.error('Error during login:', error));
// });