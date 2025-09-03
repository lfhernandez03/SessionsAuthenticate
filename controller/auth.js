const authService = require("../service/auth");

async function login(req, res) {
  try {
    console.log("Login attempt:", req.body); // Debug log

    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    try {
      const user = await authService.login(email, password);
      req.session.user = user;
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { login };
