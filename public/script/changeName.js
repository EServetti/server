document.querySelector("#ChangeName").addEventListener("click", async () => {
    const name = document.querySelector("#name").value;
    if (!name) {
      Swal.fire({
        title: "Please select a new name first",
        icon: "error",
        confirmButtonText: "Accept",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#466365",
      })
      return; 
    }else{
    const data = {
        name: name
    }
    const change = await fetch("/users", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const response = await change.json()
    Swal.fire({
      title: response.message,
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
    .then(() => {
      location.reload()
    })
    }
  })