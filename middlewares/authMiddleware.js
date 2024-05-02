const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
class authMiddlewares {
  static isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(" ");
      const [scheme, token] = parts;
      if (parts.length !== 2 || !/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token error" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        req.user = {};
        if (err) {
          return res.status(401).json({ message: "Token malformatted" });
        } else {
          req.user.username = decoded.user.username;

          req.user.batch = decoded.user.batch;
          req.user.role = decoded.user.role;
          req.user.department = decoded.user.department;
        }
        next();
      });
    } else {
      return res.status(401).json({ message: "No Authorization Token" });
    }
  }
  static isFaculty(req, res, next) {
    if (req.user.role === "faculty") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}

module.exports = authMiddlewares;
