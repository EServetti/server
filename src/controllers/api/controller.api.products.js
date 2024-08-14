import {
  paginateService,
  readService,
  readOneService,
  createService,
  updateService,
  destroyService,
} from "../../service/products.api.service.js";
import {verifyToken} from "../../utils/jwt.js"

//metodo read
async function read(req, res, next) {
  try {
    let user;
    req.cookies.token ? user = verifyToken(req.cookies.token) : user = null
    const { category } = req.query;
    let all;

    !user || user.role !== "premium" ? all = await readService() : all = await readService({ 
      supplier_id: { $ne: user._id }
    })
    const allCat = all.filter((product) => product.category === category);
    //si existen productos con la category ingresada los devuelve
    if (allCat.length !== 0) {
      return res.message200(allCat);
    }
    //sino se ingreso una query devuelve todos los productos
    else if (!category) {
      return res.message200(all);
    }
    //si no existe la query ingresada devuelve un error
    else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}
async function readMyProdcuts(req, res, next) {
  try {
    const {user} = req
    let all;
    if(user.role === "premium") {
      all = await readService({ supplier_id: user._id})
    } else {
      all = await readService()
    }
    if(!all || all.length === 0) {
      return res.error404()
    } else {
      return res.message200(all)
    }
  } catch (error) {
    return next(error)
  }
}
async function paginate(req, res, next) {
  try {
    let user;
    req.cookies.token ? user = verifyToken(req.cookies.token) : user = null
    const filter = {};    
    user && user.role === "premium" ? filter.supplier_id = { $ne: user._id} : null
    const opts = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    const all = await paginateService(filter, opts);
    const info = {
      page: all.page,
      totalPages: all.totalPages,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      maxPage: all.limit,
    };
    if (!all.docs) {
      return res.error404();
    }
    return res.paginate(all, info);
  } catch (error) {
    return next(error);
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    if (nid === ":nid") {
      return res.error400("You must enter nid!");
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
    const {_id} = req.user
    const data = req.body;
    data.supplier_id = _id
    const created = await createService(data);
    return res.message201(created);
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
    if (!eliminated) {
      return res.error404();
    }
    return res.message200(
      `The product ${eliminated.title} has been eliminated!`
    );
  } catch (error) {
    return next(error);
  }
}

export { read, readMyProdcuts, paginate, readOne, create, update, destroy };
