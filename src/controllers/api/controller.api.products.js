import {
  paginateService,
  readService,
  readOneService,
  createService,
  updateService,
  destroyService,
} from "../../service/products.api.service.js";
import CustomError from "../../utils/errors/customError.js";
import errors from "../../utils/errors/errors.js";

//metodo read
async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await readService();
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
async function paginate(req, res, next) {
  try {
    const filter = {};
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
    const data = req.body;
    if (Object.keys(data).length === 0 || !data.title || !data.description) {
      return res.error400("You must enter at least title and description of the product!");
    }
    const created = await createService(data);
    return res.message201(`The product ${data.title} has been created!`);
  } catch (error) {
    return next(error);
  }
}
//metodo update
async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    if (Object.keys(data).length === 0 || nid === ":nid") {
      return res.error400("You must enter data and nid!");
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

export { read, paginate, readOne, create, update, destroy };
