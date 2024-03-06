document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", auth);
  }
});

async function auth(event) {
  // Prevent default form submit
  event.preventDefault();

  if (window.location.pathname.includes("/admin")) {
    await authAdmin();
  } else {
    await authAlbum();
  }

  // Reload
  window.location.reload();
}

function passwordVisibilityToggle(e) {
  // TODO : Add a visibility toggle on password
}

async function authAlbum() {
  // Get dom elements
  const passwordInput = document.getElementById("password-input");

  // Send ajax /auth
  if (!passwordInput.value) return alert("Wrong creds !");

  const postData = {
    id: window.location.pathname.split("/")[1],
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
}

async function authAdmin() {
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
}
