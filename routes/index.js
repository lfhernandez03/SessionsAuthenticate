const express = require("express");
const authenticate = require("../middleware/authenticate");
const { login } = require("../controller/auth");
const { profile } = require("../controller/profile");
const { sessionInfo } = require("../controller/sessionInfo");
const { redisStatus } = require("../controller/redis");

const router = express.Router();

// Rutas públicas
router.post("/login", login);
router.get("/redis-status", redisStatus); // Endpoint público para verificar Redis

// Todas las rutas que esten despues de este middleware estan protegidas
// y solo pueden ser accedidas si el usuario esta loggeado
router.use(authenticate);

router.get("/profile", profile);

// Endpoint para verificar tiempo restante de sesión
router.get("/session-info", sessionInfo);


module.exports = router;

