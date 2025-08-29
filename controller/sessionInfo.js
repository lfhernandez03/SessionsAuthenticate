
function sessionInfo(req, res) {
  (req, res) => {
    if (req.session && req.session.clientId) {
      const timeLeft = Math.round(req.session.cookie.maxAge / 1000 / 60); // minutos restantes
      res.json({
        clientId: req.session.clientId,
        timeLeftMinutes: timeLeft,
        originalMaxAge: req.session.cookie.originalMaxAge / 1000 / 60, // duración total en minutos
      });
    } else {
      res.status(401).json({ error: "No hay sesión activa" });
    }
  };
}

module.exports = { sessionInfo };
