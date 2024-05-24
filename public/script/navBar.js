async function navBar() {
  let online = await fetch("/session", {
    method: "GET",
    credentials: "include",
  });
  online = await online.json();
  console.log("Is "+ JSON.stringify(online));
  //NavBar para customers
  if (online.statusCode === 200 & online.message.role !== 1) {
    const navBarContent = `
       <div class="container-fluid">
         <h5 style="color:white ;margin-right:20px; border: 2px solid white; padding: 20px 10px 20px 10px ">
           Everything for your home
         </h5>
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
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="border-bottom: 1px solid white">
           <div class="navbar-nav">
             <a
               class="nav-link active"
               aria-current="page"
               href="/"
               style="color: white"
             >
               Home
             </a>
             <span style="width: 900px;"></span>
             <details style="display: flex; align-items: center;margin-right:10px">
             <summary style="list-style: none; -webkit-details-marker: none;"><img src=${online.message.photo} style="height:50px;width:auto; border: 1px solid white; border-radius: 5px"/></summary>
             <a class="nav-link" href="/users" style="color: white">
             Details
             </a>
             <button type="button" id="closeSession" style="background-color: #b49a67; border: none"><img src="/img/logout.png" style="height:25px; width: auto;"/></button>
             </details>
             <a class="nav-link" href="/carts" style="color: white">
              <img
                src="/img/carrito-de-compras.png"
                style="width: 45px; height:auto;"
              />
             </a>
           </div>
         </div>
       </div>
      `;
    document.querySelector("#mainNavbar").innerHTML = navBarContent;
  }
  // NavBar para sellers
   else if (online.message.role === 1) {
    const navBarContent = `
       <div class="container-fluid">
         <h5 style="color:white ;margin-right:20px; border: 2px solid white; padding: 20px 10px 20px 10px ">
           Everything for your home
         </h5>
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
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="border-bottom: 1px solid white">
           <div class="navbar-nav">
             <a
               class="nav-link active"
               aria-current="page"
               href="/"
               style="color: white"
             >
               Home
             </a>
             <a class="nav-link" href="/products/real" style="color: white; white-space: nowrap;">
               Create a product
             </a>
             <span style="width: 700px;"></span>
             <details style="display: flex; align-items: center;margin-right:10px">
             <summary style="list-style: none; -webkit-details-marker: none;"><img src=${online.message.photo} style="height:50px;width:auto; border: 1px solid white; border-radius: 5px"/></summary>
             <a class="nav-link" href="/users" style="color: white">
             Details
             </a>
             <button type="button" id="closeSession" style="background-color: #b49a67; border: none"><img src="/img/logout.png" style="height:25px; width: auto;"/></button>
             </details>
             <a class="nav-link" href="/carts" style="color: white">
              <img
                src="/img/carrito-de-compras.png"
                style="width: 45px; height:auto;"
              />
             </a>
           </div>
         </div>
       </div>
      `;
    document.querySelector("#mainNavbar").innerHTML = navBarContent;
  }
  //NavBar para sesiones NO iniciadas
   else {
    const navBarContent = `
       <div class="container-fluid">
         <h5 style="color:white ;margin-right:20px; border: 2px solid white; padding: 20px 10px 20px 10px ">
           Everything for your home
         </h5>
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
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="border-bottom: 1px solid white">
           <div class="navbar-nav">
             <a
               class="nav-link active"
               aria-current="page"
               href="/"
               style="color: white"
             >
               Home
             </a>
             <a class="nav-link" href="/users/login" style="color: white;  white-space: nowrap;">
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
  document
    .querySelector("#closeSession")
    .addEventListener("click", async () => {
      await fetch("/session/signout");
      return location.replace("/");
    });
}
document.addEventListener("DOMContentLoaded", () => {
  navBar();
});
