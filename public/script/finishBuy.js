document.querySelector("#finish").addEventListener("click", async()=> {
    console.log("I heard");
    let user = await fetch(`/api/sessions`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    user = await user.json()
    const uid = user.message._id
    const response = await fetch(`/api/tickets/${uid}`) 
    const all = await response.json()
    if(all.statusCode === 404){
        Swal.fire({
            title: "You must add something to cart first!",
            confirmButtonText: "Accept",
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#466365",
          });
    }else {
        return location.replace("/tickets/finish")
    }
})

    