document.querySelector("#Change").addEventListener("click", async () => {
  const photo = document.querySelector("#photo");

  if (!photo.files || !photo.files[0]) {
    Swal.fire({
      title: "Please select a image first",
      icon: "error",
      confirmButtonText: "Accept",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#466365",
    })
    return; 
  }else{
    const formData = new FormData();
  formData.append('photo', photo.files[0]);
  const change = await fetch("/users", {
    method: 'PUT',
    body: formData
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