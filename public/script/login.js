document.querySelector("#LogIn").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const data = {
    email: email,
    password: password
  }
  const log = await fetch("/api/sessions/login", {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  const response = await log.json()
  if (response.statusCode === 200) {
    location.replace("/")
  } else {
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