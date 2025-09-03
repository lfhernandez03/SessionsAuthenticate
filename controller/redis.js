const { redisClient, checkRedisConnection } = require("../db/redis");

const redisStatus = async (req, res) => {
  try {
    // Verificar conexión básica
    const isConnected = await checkRedisConnection();
    
    // Obtener información del servidor Redis
    const info = await redisClient.info();
    const clientInfo = await redisClient.clientInfo();
    
    // Probar operaciones básicas
    await redisClient.set('test_key', 'test_value', { EX: 10 });
    const testValue = await redisClient.get('test_key');
    
    res.json({
      status: 'connected',
      isConnected,
      testOperation: testValue === 'test_value' ? 'success' : 'failed',
      serverInfo: {
        version: info.split('\r\n').find(line => line.startsWith('redis_version'))?.split(':')[1],
        uptime: info.split('\r\n').find(line => line.startsWith('uptime_in_seconds'))?.split(':')[1] + ' seconds',
        connectedClients: info.split('\r\n').find(line => line.startsWith('connected_clients'))?.split(':')[1],
        usedMemory: info.split('\r\n').find(line => line.startsWith('used_memory_human'))?.split(':')[1],
      },
      clientInfo: {
        id: clientInfo.id,
        addr: clientInfo.addr,
        age: clientInfo.age + ' seconds'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      isConnected: false,
      error: error.message,
      troubleshooting: [
        'Verificar que Redis esté instalado y ejecutándose',
        'Comprobar que el puerto 6379 esté disponible',
        'Ejecutar: redis-server (para iniciar Redis)',
        'Verificar la configuración de host y puerto'
      ]
    });
  }
};

module.exports = { redisStatus };
