const express = require("express");
const session = require("express-session");
const redis = require("redis");
const { RedisStore } = require("connect-redis");
const router = require("./routes");

const app = express();

// Configure Redis
const redisClient = redis.createClient({
  socket: {
    port: 6379,
    host: "localhost",
  },
});

// Connect to Redis
redisClient.connect().catch(console.error);

// Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "mySecret",
    saveUninitialized: false,
    resave: true, // Renovar sesión en cada request
    rolling: true, // Reiniciar el maxAge en cada request
    name: 'sessionId',
    cookie: {
      secure: false, // If true: only transmit cookie over HTTPS
      httpOnly: true, // If true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 30, // Session age in milliseconds (se reinicia en cada request)
    },
  })
);

// Middleware to parse JSON
app.use(express.json());

/* 
// Middleware para renovar sesión solo si está próxima a expirar
app.use((req, res, next) => {
  if (req.session && req.session.clientId) {
    // Verificar si la sesión expira en los próximos 5 minutos
    const now = Date.now();
    const sessionStart = req.session.cookie.originalMaxAge - req.session.cookie.maxAge;
    const sessionAge = now - sessionStart;
    const timeLeft = req.session.cookie.maxAge;
    
    // Si quedan menos de 5 minutos, renovar la sesión
    if (timeLeft < 5 * 60 * 1000) { // 5 minutos en milisegundos
      req.session.cookie.maxAge = 1000 * 60 * 30; // Renovar por otros 30 minutos
      console.log('Sesión renovada para usuario:', req.session.clientId);
    }
  }
  next();
}); 
*/

app.use(router)

// Endpoint para verificar tiempo restante de sesión
app.get("/session-info", (req, res) => {
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
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(8080, () => console.log(`Server is running on port 8080`));
