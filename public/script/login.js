
    async function redirect() {
        try {
        let uid = document.getElementById("uid").value;
        //revisar que tenga el formato de los _id de mongo
        function esObjectIdValido(input) {
            // Expresión regular para validar ObjectId
            const objectIdRegex = /^[0-9a-fA-F]{24}$/;
            return objectIdRegex.test(input);
        }
        if(!uid) {
            alert("Insert user id")
        }else if (!esObjectIdValido(uid)) {
            alert("The id has to be 24 hexadecimal characters")
        } else {
            window.location.href = "/users/" + uid
        }
        
        } catch(error){
            return(error)
        }
    }
