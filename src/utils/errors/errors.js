const errors = {
  error: { message: "Error", statusCode: 400 },
  exists: {message: "The cart already exists!", statusCode: 409},
  alreadyUpdated: {message: "You have already updated your role!", statusCode: 401},
  missingData: {message: "You must enter at least email, password, and name", statusCode: 400},
  invalid: {message: "Invalid credentials!", statusCode: 401},
  notLogged: {message: "You must login!", statusCode: 401},
  auth: { message: "Bad auth", statusCode: 401 },
  forbidden: { message: "Forbidden", statusCode: 403 },
  notFound: { message: "Not found", statusCode: 404 },
  fatal: { message: "Fatal", statusCode: 500 },
  expDateToken: {message: "The current token doesn't have a valid exp date", statusCode: 500},
  productExist: {message: "There's already a product with this name!", statusCode: 401},
  userExists: {message: "There's already a user with this email!", statusCode: 401},
  hasNoStock: {message: "Sorry this product doesn't have stock!", statusCode: 400}
};

export default errors;
