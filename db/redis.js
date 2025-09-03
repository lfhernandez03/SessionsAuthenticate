const redis = require("redis");

// Configure Redis
const redisClient = redis.createClient({
  socket: {
    port: 6379,
    host: "localhost",
  },
});

// Event listeners para la conexión
redisClient.on('connect', () => {
  console.log('🔗 Conectando a Redis...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis conectado y listo para usar');
});

redisClient.on('error', (err) => {
  console.error('❌ Error de conexión a Redis:', err.message);
});

redisClient.on('end', () => {
  console.log('📴 Conexión a Redis cerrada');
});

// Función para conectar a Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('🚀 Intentando conectar a Redis...');
  } catch (error) {
    console.error('💥 Error al conectar a Redis:', error.message);
    process.exit(1); // Salir si no se puede conectar a Redis
  }
};

// Función para verificar la conexión
const checkRedisConnection = async () => {
  try {
    const response = await redisClient.ping();
    console.log('🏓 Redis PING response:', response);
    return true;
  } catch (error) {
    console.error('❌ Redis no está disponible:', error.message);
    return false;
  }
};

module.exports = { 
  redisClient, 
  connectRedis, 
  checkRedisConnection 
};
