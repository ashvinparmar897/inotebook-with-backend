const jwt = require("jsonwebtoken");
const JWT_SECRET = "ashvinisagoodb@oy";

const userfetch = (req, res, next) => {
  // Get the use from jwt-token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({error:"Please Authenticate using a valid token"})
  }
  try {
    const data =jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    const id = data.user;
    next();
} catch (error) {
    return res.status(401).send({error:"Please Authenticate using a valid token"})
}
  
};


module.exports = userfetch;
