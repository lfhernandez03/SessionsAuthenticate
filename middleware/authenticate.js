function authenticate(req, res, next) {
  console.log("Authentication check:", {
    path: req.path,
    sessionID: req.sessionID,
    hasSession: !!req.session,
    clientId: req.session?.clientId
  });

  if (!req.session || !req.session.user) {
    console.log("Authentication failed - No valid session");
    const err = new Error("You shall not pass - Authentication required");
    err.statusCode = 401;
    return next(err);
  }
  
  console.log("Authentication successful for:", req.session.user);
  next(); // Importante: llamar next() si está autenticado
}

module.exports = authenticate;
 