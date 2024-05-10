

async function navBar() {
  let online = await fetch("/session", {
    credentials: "include"
  });
  online = await online.json();
  console.log("The user is " +JSON.stringify(online));
  if (online.statusCode === 200) {
    `
       <div class="container-fluid">
         <h5 style="color:white ;margin-right:20px; border: 2px solid white; padding: 20px 10px 20px 10px ">
           Everything for your home
         </h5>
         <a class="navbar-brand" href="" style="color: white;">
           Navbar
         </a>
         <button
           class="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNavAltMarkup"
           aria-controls="navbarNavAltMarkup"
           aria-expanded="false"
           aria-label="Toggle navigation"
           style="color: white"
         >
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div class="navbar-nav">
             <a
               class="nav-link active"
               aria-current="page"
               href="/"
               style="color: white"
             >
               Home
             </a>
             <a class="nav-link" href="/products/real" style="color: white">
               Create a product
             </a>
             <span style="width: 600px;"></span>
             <button class="nav-link" onclick="goCart()" style="color: white;">
               <img
                 src="/img/carrito-de-compras.png"
                 style="width: 35px; height:auto;"
               />
             </button>
           </div>
         </div>
       </div>
      `;
  } else {
    const navBarContent = `
       <div class="container-fluid">
         <h5 style="color:white ;margin-right:20px; border: 2px solid white; padding: 20px 10px 20px 10px ">
           Everything for your home
         </h5>
         <a class="navbar-brand" href="" style="color: white;">
           Navbar
         </a>
         <button
           class="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNavAltMarkup"
           aria-controls="navbarNavAltMarkup"
           aria-expanded="false"
           aria-label="Toggle navigation"
           style="color: white"
         >
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div class="navbar-nav">
             <a
               class="nav-link active"
               aria-current="page"
               href="/"
               style="color: white"
             >
               Home
             </a>
             <a class="nav-link" href="/users/login" style="color: white">
               Log in
             </a>
             <a class="nav-link" href="/users/register" style="color: white">
               Register
             </a>
             <span style="width: 600px;"></span>
           </div>
         </div>
       </div>
      `;
    document.querySelector("#mainNavbar").innerHTML = navBarContent;
  }
}
 navBar()