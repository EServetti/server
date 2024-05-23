class UserManager {
  //Se crea el array de clase y priviado que contiene a todos los usuarios
  static #users = [];
  //metodo para crear un nuevo usuario
  create(data) {
    try {
      // Verificar si no se ingreso alguna propiedad
      if (!data.email || !data.password || !data.name || !data.age) {
        console.log("¡Missing data!");
        return;
      }
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo:
          data.photo ||
          "https://www.informatique-mania.com/wp-content/uploads/2021/02/guest.png",
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        role: data.role || 0,
      };
      UserManager.#users.push(user);
      console.log(`The user has been created`);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para leer todos los usuarios
  read() {
    try {
      const all = UserManager.#users;
      return all;
      console.log(all);
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para leer un usuario especifico
  readOne(data) {
    try {
      for (const user of UserManager.#users) {
        if (data === user.id) {
          return user;
          console.log(user);
        }
      }
      return console.log("!User not found!");
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para actializar un usuario
  update(id, data) {
    try {
      if (!id || !data) {
        console.log("Missing data!");
      } else {
        const all = this.read();
        let one = all.find((each) => each.id === id);
        if (one) {
          for (let prop in data) {
            one[prop] = data[prop];
          }
          console.log(`The user has been updated`);
          console.log(one);
        } else {
          console.log("!User not found!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para eliminar un usuario especifico
  destroy(data) {
    try {
      const delOne = UserManager.#users.filter((user) => user.id === data);
      const filtered = UserManager.#users.filter((user) => user.id !== data);
      UserManager.#users = filtered;
      console.log(`The user has been eliminated`);
    } catch (error) {
      console.log(error);
    }
  }
}

const users = new UserManager();

//usuario 1
users.create({
  photo: 'https://vistapointe.net/images/martin-1.jpg',
  email: 'juanB20@gmail.com',
  password: 'juan2020',
});
//usuario 2
users.create({
  photo: 'https://tse4.mm.bing.net/th?id=OIP.YthT73iiy-WyAal4okPmHAHaF7&pid=Api&P=0&h=180',
  email: 'julietaa1@hotmail.com',
  password: 'estrella123',
});
//usuario 3
users.create({
  photo: 'https://i.pinimg.com/originals/e1/7a/f7/e17af71ecf9bc47f161e978a711bd757.jpg',
  email: 'martinP2-1@gmail.com',
  password: 'marteeen',
});
//usuario 4
users.create({
  photo: 'https://i0.wp.com/celebritate.com/wp-content/uploads/2023/05/Stefany-Kyler.jpg?resize=922%2C1024&ssl=1',
  email: 'stefanyok@gmail.com',
  password: '123654',
});
//leo todos los usuarios
const all = users.read();
console.log(all);
//leo el primer usuario
const one =users.readOne(1);
console.log(one);
//actualizo el primer usuario
users.update(1, {
  photo: 'https://vistapointe.net/images/martin-1.jpg',
  email: 'juanB20@gmail.com',
  password: 'juan2020',
  role: 1
});
//elimino el ultimo usuario
users.destroy(4);
//leo todos de nuevo
const allAgain = users.read();
console.log(allAgain);