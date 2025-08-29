const express = require("express");
const router = require("./routes");
const { redisClient, connectRedis, checkRedisConnection } = require("./db/redis.js");
const createSessionMiddleware = require("./middleware/session");
const app = express();

// Función para inicializar la aplicación
const startServer = async () => {
  try {
    console.log("🚀 Iniciando servidor...");
    
    // Conectar a Redis primero
    await connectRedis();
    
    // Verificar la conexión
    const isConnected = await checkRedisConnection();
    if (!isConnected) {
      throw new Error('No se pudo verificar la conexión a Redis');
    }

    // Middleware to parse JSON
    app.use(express.json());
    
    // Crear y configurar el middleware de sesiones DESPUÉS de conectar Redis
    const sessionMiddleware = createSessionMiddleware();
    app.use(sessionMiddleware);

    // Rutas
    app.use(router);

    // Error handler
    app.use((err, req, res, next) => {
      console.error("💥 Error handler:", err.message);
      res.status(err.statusCode || 500).json({ error: err.message });
    });

    app.listen(8080, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://localhost:8080`);
      console.log(`📊 Redis status: Connected`);
      console.log(`🔗 Rutas disponibles:`);
      console.log(`   GET  http://localhost:8080/test`);
      console.log(`   POST http://localhost:8080/login`);
      console.log(`   GET  http://localhost:8080/redis-status`);
      console.log(`   GET  http://localhost:8080/profile (requiere login)`);
    });

  } catch (error) {
    console.error('💥 Error al inicializar el servidor:', error.message);
    process.exit(1);
  }
};

// Inicializar el servidor
startServer();
