// it should read the x-auth-token header
// it should validate the token
// it should add the user to the request object.
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "no token authorization denied" });
  }
  try {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log("something went wrong with auth middleware");
    res.status(500).json({ error: "server error" });
  }
};
