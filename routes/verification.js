const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verfied = jwt.verify(token, "this_secret_key");
    req.user = verfied;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};
