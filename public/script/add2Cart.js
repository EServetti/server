document.querySelector("#add2Cart").addEventListener("click", async () => {
  const product_id = document.querySelector("#pid").textContent
  const data = {
    product_id: product_id
  }
  const add = await fetch("/carts", {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  const response = await add.json()
  if(response.statusCode === 201) {
     Swal.fire({
      title: response.message,
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    });
  }
})