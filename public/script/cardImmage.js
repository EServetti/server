document.querySelector("#methods").addEventListener("change", () =>{
    const form = document.querySelector("#methods").value
    console.log("I heard "+ form);
    if(form === "Visa") {
        const img = `<img class="Visa" style="width: 50px; height:auto" src="/img/visa.jpg"></img>`
        document.querySelector("#cardImmage").innerHTML = img
    } else if(form === "Mastercard"){
        const img = `<img class="Visa" style="width: 50px; height:auto" src="/img/mastercard.png"></img>`
        document.querySelector("#cardImmage").innerHTML = img
    } else if(form === "Naranja"){
        const img = `<img class="Visa" style="width: 50px; height:auto" src="/img/naranja.png"></img>`
        document.querySelector("#cardImmage").innerHTML = img
    }
})