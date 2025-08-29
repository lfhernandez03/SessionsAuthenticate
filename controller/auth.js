const login = (req, res) => {
  try {
    console.log("🔍 Login attempt:", req.body); // Debug log
    
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }

    // Simulación de validación de usuario (reemplazar con tu lógica real)
    if (email === "admin@example.com" && password === "admin") {
      // Crear sesión
      req.session.clientId = "abc123";
      req.session.myNum = 5;
      req.session.userEmail = email;
      
      console.log("✅ Session created:", {
        sessionID: req.sessionID,
        clientId: req.session.clientId
      });

      res.json({
        message: "You're now logged in",
        sessionId: req.sessionID,
        clientId: req.session.clientId
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login };
