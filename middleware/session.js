const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { redisClient } = require("../db/redis.js");

console.log("🔧 Configurando middleware de sesiones...");

const createSessionMiddleware = () => {
  const sessionMiddleware = session({
    store: new RedisStore({ 
      client: redisClient,
      prefix: "sess:",
      ttl: 30 * 60 // 30 minutos en segundos
    }),
    secret: "mySecret",
    saveUninitialized: false,
    resave: true, // Renovar sesión en cada request
    rolling: true, // Reiniciar el maxAge en cada request
    name: "sessionId",
    cookie: {
      secure: false, // If true: only transmit cookie over HTTPS
      httpOnly: true, // If true: prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 30, // Session age in milliseconds (se reinicia en cada request)
    },
  });

  console.log("✅ Middleware de sesiones configurado");
  return sessionMiddleware;
};

module.exports = createSessionMiddleware;
