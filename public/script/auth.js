document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("login-form");
  form.addEventListener("submit", auth);
});

/*
// URL of the REST API endpoint
const apiUrl = 'https://example.com/api';

// Data to be sent in the POST request (in JSON format)
const postData = {
  key1: 'value1',
  key2: 'value2'
};

// Constructing the request object
const requestOptions = {
  method: 'POST', // HTTP request method
  headers: {
    'Content-Type': 'application/json', // Specify that we are sending JSON data
    // Add any other headers if required
  },
  body: JSON.stringify(postData) // Convert data to JSON format
};

// Sending the POST request using fetch()
fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Handle the data returned from the server
    console.log('Response from server:', data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('Error:', error);
  });
*/

async function auth(event) {
  // Prevent default form submit
  event.preventDefault();

  // Get dom elements
  const idInput = document.getElementById("id-input");
  const passwordInput = document.getElementById("password-input");

  // Send ajax /auth
  if (!idInput.value && !passwordInput.value) return alert("Wrong creds !");

  const postData = {
    id: idInput.value,
    password: passwordInput.value,
  };

  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };

  const response = new Promise((resolve, reject) => {
    fetch("/api/auth/login", reqOptions)
      .then((res) => {
        if (!res.ok) {
          reject(new Error("Authentication failed"));
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  let responseData = await response;

  // Place token into session
  localStorage.setItem("token", responseData.token);

  // Reload
  window.location.reload();
}

function passwordVisibilityToggle(e) {
  // TODO : Add a visibility toggle on password
}
