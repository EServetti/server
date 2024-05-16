document.querySelector("#Register").addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const password_2 = document.querySelector("#password-2").value;
  //calculo la edad segun la fecha de nacimiento
  const bithDate = document.querySelector("#age").value
  const date = new Date(bithDate)
  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  //Ajusta segun si cumplio ya los años o no
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age --;
  }


  //revisar que las contraseñas sean iguales
  if (password !== password_2) {
    Swal.fire({
      title: "Passwords must be equal!",
      icon: "error",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    });
  } else {
    const data = {};
    data.email = email;
    data.password = password;
    data.name = name
    data.age = age
    const register = await fetch("/api/sessions/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await register.json();
    console.log(response);
    if (response.statusCode === 201) {
      Swal.fire({
        title: response.message,
        confirmButtonText: "Accept",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#466365",
      }).then(() => {
        return location.replace("/users/login");
      });
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
  }
});
