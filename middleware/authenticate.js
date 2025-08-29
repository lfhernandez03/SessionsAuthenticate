function authenticate(req, res, next) {
  if (!req.session || !req.session.clientId) {
    const err = new Error("You shall not pass");
    err.statusCode = 401;
    return next(err);
  }
  next(); // Importante: llamar next() si está autenticado
}

module.exports = authenticate;
