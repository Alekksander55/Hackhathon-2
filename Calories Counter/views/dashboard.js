//  // Fetch user information using the stored token
//  const token = localStorage.getItem('token');
//  console.log('Stored Token:', token);
//  if (token) {
//      fetch('/dashboard', {
//          method: 'GET',
//          headers: {
//              'Content-Type': 'application/json',
//          },
//      })
//      .then(response => response.json())
//      .then(data => {
//          // Update the HTML elements with user information
//          console.log('User Information:', data);
//      })
//      .catch(error => console.error('Error fetching user information:', error));
//  } else {
//      // Redirect to the login page if no token is present
//      window.location.href = '/login';
//  }



document.getElementById('foodForm').addEventListener('submit', function(e) {
    e.preventDefault();
    submitFood();
});

function submitFood() {
    const foodName = document.getElementById('food').value;
    const quantity = document.getElementById('quantity').value;
    sendToEdamamAPI(foodName, quantity);
}
async function sendToEdamamAPI(foodName, quantity) {
  const appId = `9193b384`;
  const appKey = `e0c5a3f89b4f1208af25e5a74464f0fb`;

  const endpoint = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${quantity}%20${foodName}`;


  const response = await fetch(endpoint)

  if (response.ok) {
    const data = await response.json();
    console.log("Edamam API Response:", data);
    const calories = document.getElementById('calories').innerHTML = `${data.calories} kcal` 
    const protein = document.getElementById('protein').innerHTML = `${data.totalNutrients.PROCNT.quantity} grams`
    const carbs = document.getElementById('carbs').innerHTML = `${data.totalNutrients.CHOCDF.quantity} grams`
    const fats = document.getElementById('fats').innerHTML = `${data.totalNutrients.FAT.quantity} grams`
    const dailyCalories = document.getElementById('daily-calories').innerHTML = `${data.totalDaily.ENERC_KCAL.quantity} %` 
    const dailyProtein = document.getElementById('daily-protein').innerHTML = `${data.totalDaily.PROCNT.quantity} %`
    const dailyCarbs = document.getElementById('daily-carbs').innerHTML = `${data.totalDaily.CHOCDF.quantity} %`
    const dailyFats = document.getElementById('daily-fats').innerHTML = `${data.totalDaily.FAT.quantity} %`

    
  } else {
    console.error("Error sending data to Edamam API:", response.statusText);
  }
}


