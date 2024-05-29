const socket = io();

//recibe los products y los agrega al div con id: product, con un formato estilizado
socket.on("products", (data) => {
  const content = data
    .map(
      (each) => ` 
  <div class="productCont" style="display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:white; width:350px; padding: 0 10px 0 10px; margin: 10px 30px 10px 30px; border: 1px solid black; border-radius:10px"> 
  <img src="${each.photo}" class="productImage" style="width:
  300px; height: 300px; margin-top: 10px; border: 1px solid #6781B4; border-radius:10px"> 
  <div class="productInfo" style="display: flex;
  justify-content:center; flex-direction:column; align-items: center; border: 1px solid #6781B4;border-radius:10px; padding: 10px; margin: 10px"> 
  <h5 style="margin-right: 5px;">${each.title}</h5>
  <h5 style="display: flex;justify-content: center;width: 100%;border-bottom: 2px solid #6781B4">$${each.price}</h5><h6>id:${each._id}</h6>
  </div> 
  </div>`
    )
    .reverse()
    .join("");
  document.querySelector("#product").innerHTML = content;
});
//envia los datos del producto
document
  .querySelector("#productForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    let photo = document.querySelector("#photo").value;
    //si no se ingreso el title no deja enviar el producto
    if (!title.trim()) {
      Swal.fire({
        title: "Insert title of the product!",
        icon: "error",
        confirmButtonText: "Accept",
        timer: 5000,
        timerProgressBar: true,
        confirmButtonColor: "#466365",
      });
    }
    //si no se ingreso la photo se maneja el socket por acá
    else if (!photo.trim()) {
      photo = "/img/defaultProduct.png";

      let category = document.querySelector("#category").value;
      let price = document.querySelector("#price").value;
      let stock = document.querySelector("#stock").value;
      // Manejo valores por defecto desde aquí porque si no se pasan como arrays vacíos
      if (!category) {
        category = "product";
      }
      if (!price) {
        price = 1;
      }
      if (!stock) {
        stock = 1;
      }

      socket.emit("product", {
        title,
        photo,
        category,
        price,
        stock,
      });
      document.querySelector("#photo").value = "";
      document.querySelector("#photoLabel").innerText =
        "Insert immage of the product";
      document.querySelector("#title").value = "";
      document.querySelector("#category").value = "";
      document.querySelector("#price").value = "";
      document.querySelector("#stock").value = "";
    } else {
      const photoInput = document.querySelector("#photo");
      const photoFile = photoInput.files[0];

      //toma el file y lo pasa a traves de photo como dato de base64
      const reader = new FileReader();
      reader.readAsDataURL(photoFile);
      reader.onloadend = function () {
        const photoBase64 = reader.result;

        let category = document.querySelector("#category").value;
        let price = document.querySelector("#price").value;
        let stock = document.querySelector("#stock").value;
        // Manejo valores por defecto desde aquí porque si no se pasan como arrays vacíos
        if (!category) {
          category = "product";
        }
        if (!price) {
          price = 1;
        }
        if (!stock) {
          stock = 1;
        }
        socket.emit("product", {
          title,
          photo: photoBase64,
          category,
          price,
          stock,
        });
        document.querySelector("#photo").value = "";
        document.querySelector("#photoLabel").innerText =
          "Insert immage of the product";
        document.querySelector("#title").value = "";
        document.querySelector("#category").value = "";
        document.querySelector("#price").value = "";
        document.querySelector("#stock").value = "";
      };
    }
  });
//alerta por si el producto ya esta creado
socket.on("alert", (message) => {
  Swal.fire({
    title: message,
    icon: "error",
    confirmButtonText: "Accept",
    timer: 5000,
    timerProgressBar: true,
    confirmButtonColor: "#466365",
  });
});
