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