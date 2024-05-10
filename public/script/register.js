document.querySelector("#Register").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const data = {
    email: email,
    name: name,
    password: password
  };
  const register = await fetch("/api/sessions/register", {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  const response = await register.json()
  console.log(response);
  if(response.statusCode === 201) {
    Swal.fire({
      title: response.message,
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    }).then(() => {
      return location.replace("/users/login")
    })
  }else{
    Swal.fire({
      title: response.message,
      icon: "error",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    });
  }
})