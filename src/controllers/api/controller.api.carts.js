import { readService, paginateService, readOneService, createService,updateService, destroyService} from "../../service/carts.api.service.js"
import { verifyToken } from "../../utils/jwt.js";



//metodo read
async function read(req, res, next) {
  try {
    const { user } = req.query;
    const all = await readService();
    const allUser = all.filter((cart) => cart.user_id._id == user);
    //si no hay ningun carrito en general devuelve un error
    if(all.length === 0){
      return res.error404()
    }
    //si existen carritos con el user_id ingresado los devuelve
    if (allUser.length !== 0) {
      return res.message200(allUser);
    }
    //sino se ingreso una query devuelve todos los carritos
    else if (!user) {
      return res.message200(all);
    }
    //si no existe un carrito con ese user_id devuelve error
    else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}
//metodo paginate
async function paginate(req, res, next) {
    try {
      const { user } = req.query;
      const {limit, page} = req.query
      const filter = {};
      const opts = {};
      if (user) {
        filter.user_id = user;
      }
      if(limit) {
        opts.limit = limit
      }
      if(page) {
        opts.page = page
      }
      const all = await paginateService(filter, opts);
      const info = {
        page: all.page,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
        totalPages: all.totalPages,
      };
      if(!all.docs){
        return res.error404()
      }
      return res.paginate(all, info)
    } catch (error) {
      return next(error);
    }
  }
  //metodo readOne
  async function readOne(req, res, next) {
    try {
      const { nid } = req.params;
      if(nid === ":nid"){
        return res.error400("You must enter nid!")
      }
      const one = await readOneService(nid);
      if (!one) {
        return res.error404();
      }
      return res.message200(one);
    } catch (error) {
      return next(error);
    }
  }
  //metodo create
  async function create(req, res, next) {
    try {
      const data = req.body;
      const token = verifyToken(req.cookies.token);
      data.user_id = token._id;
      //verifico si el user ya tiene un cart con el mismo product
      const carts = await paginateService({
        user_id: data.user_id
      },{})
      const exists = carts.docs.find((c) => c.product_id._id == data.product_id)
      if(exists){
        const data = {
          quantity: exists.quantity + 1
        }
        await updateService(exists._id, data)
        return res.message201("The product has been added to cart")
      } else {
        await createService(data);
        return res.message201("The product has been added to cart");
      }
    } catch (error) {
      return next(error);
    }
  }
  //metodo update
  async function update(req, res, next) {
    try {
      const { nid } = req.params;
      const data = req.body;
      if (nid === ":nid") {
        return res.error400("You must enter nid!");
      }
      const updated = await updateService(nid, data);
      if (!updated) {
        return res.error404();
      }
      return res.message200(updated);
    } catch (error) {
      return next(error);
    }
  }
  //metodo destroy
  async function destroy(req, res, next) {
    try {
      const { nid } = req.params;
      if (nid === ":nid") {
        return res.error400("You must enter nid!");
      }
      const eliminated = await destroyService(nid);
      if(!eliminated) {
        return res.error404()
      }
      return res.message200(`The product has been eliminated of the cart!`);
    } catch (error) {
      return next(error);
    }
  }
  //metodo destroy (todos los carritos de un user)
  async function desAll(req, res, next) {
    try {
      const token = verifyToken(req.cookies.token);
      const {_id} = token
      if (_id) {
        const filter = {
          user_id: _id,
        };
        const opts = {};
        let allCarts = await paginateService(filter, opts);
        allCarts = allCarts.docs;
        allCarts.forEach(async (element) => {
          await destroyService(element._id);
        });
        //despues de eliminar los carritos actualizo all y lo envío
        let all = await paginateService(filter, opts);
        all = all.docs;
        return res.message200("The products has been eliminated");
      } else {
        return res.error400("You must log in!");
      }
    } catch (error) {
      return next(error);
    }
  }

export {read, paginate, readOne, create, update, destroy, desAll}