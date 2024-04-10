

const socket = io(); 
  //recibe los products y los agrega al div con id: product, con un formato estilizado
  socket.on("products", data => { const content =
  data.map(each => ` <div class="productCont" style="background-color:white;
  width:350px; padding: 0 10px 0 10px; margin: 10px 30px 10px 30px; border: 1px
  solid black;"> <img src="${each.photo}" class="productImage" style="width:
  300px; height: 300px;"> <div class="productInfo" style="display: flex;
  justify-content:center; flex-direction:column; align-items: center;"> <h5 style="margin-right: 5px;">${each.title}</h5>
  <h5>${each.price}</h5><h6>id:${each.id}</h6></div> </div>`).reverse().join("");
  document.querySelector("#product").innerHTML = content; });
//envia los datos del producto
  document.querySelector("#create").addEventListener("click", (event) => {
    const title = document.querySelector("#title").value
    const photo = document.querySelector("#photo").value
    const category = document.querySelector("#category").value
    const price = document.querySelector("#price").value
    const stock = document.querySelector("#stock").value
    socket.emit("product", {title, photo, category, price, stock})
  })