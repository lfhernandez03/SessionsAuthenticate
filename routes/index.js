const express = require("express");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req;

  req.session.clientId = "abc123";
  req.session.myNum = 5;
  res.json("You're now logged in");
});

router.use(authenticate);

router.get("/profile", (req, res) => {
  res.json(req.session);
});

module.exports = router;

