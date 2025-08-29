function profile(req, res) {
  (req, res) => {
    res.json(req.session);
  };
}

module.exports = { profile };
