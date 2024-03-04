async function login(){
  let loginInput = document.getElementById("login");
  let passwordInput = document.getElementById("password");
  let response = await fetchData(BASE_URL + "api/auth", "post", {
    login: loginInput.value,
    password: passwordInput.value
  })
  if(response.sucess){
    localStorage.setItem("token", response.authToken);
    window.location("/admin");
  }
}