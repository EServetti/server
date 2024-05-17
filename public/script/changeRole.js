  document.querySelector("#update").addEventListener("click", async () => {
    
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

  if (!bithDate) {
    Swal.fire({
      title: "Please select a date first",
      icon: "error",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
    return; 
  }else if(age < 18) {
    Swal.fire({
      title: "You must be at least 18 years old!",
      icon: "error",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
    return; 
  }
  else{
  const data = {
      age: age,
      role: 1
  }
  const change = await fetch("/users", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const response = await change.json()
  if(response.statusCode === 200) {
    Swal.fire({
      title: "Now you are a seller!",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
    .then(() => {
      location.replace("/users")
    })
  } else {
    Swal.fire({
      title: response.message,
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
  }
  }
  })
  